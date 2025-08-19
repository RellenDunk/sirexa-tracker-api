import prisma from "../db/connection";
import { Registration, Session, CurrentSession } from "../generated/prisma";

export const getAllRegistrations = async (): Promise<Registration[]> => {
    return await prisma.registration.findMany();
}

export const registerMain = async (characterName: string, userName: string ): Promise<Registration> => {
    
    const currentServer = await prisma.currentServer.findFirst();
    if (!currentServer) {
        throw new Error("No current server found");
    }
    return await prisma.registration.create({
        data:{
            userName:userName,
            type: 'MAIN',
            origin:'NEW',
            user:{
                connectOrCreate:{
                    create: {
                        characterName: characterName,
                        lastRegistrationAt: new Date(Date()),
                        server: {
                            connect: {
                                id: currentServer.currentServerId
                            }
                        }
                    },
                    where: {
                        characterName_serverId: {
                            characterName: characterName,
                            serverId: currentServer.currentServerId
                        }
                    }
                }
            },
            session:{
                create:{
                    server:{
                        connect:{
                            id: currentServer.currentServerId
                        }
                    },
                }
            },
        }
    }).then(async (reg) => {
        await prisma.currentSession.upsert({
            where:{
                id: 1
            },
            update:{
                session:{
                    connect:{
                        id: reg.sessionId
                    }
                }
            },
            create:{
                session:{
                    connect:{
                        id: reg.sessionId
                    }
                }
            }
        }).then(() => {
            // increment the count of active registrations)
            return prisma.session.update({
                where: {
                    id: reg.sessionId
                },
                data: {
                    currentNumUsers: {
                        increment: 1
                    }
                }
            });
        })
        return reg;
    }) 
}

export const registerSecondary = async (characterName: string, userName: string): Promise<Registration> => {
    const currentServer = await prisma.currentServer.findFirst();
    if (!currentServer) {
        throw new Error("No current server found");
    }
    const currentSession = await prisma.currentSession.findFirst({
        include:{
            session:{
                include:{
                    registrations:true
                }
            }
        }
    })
    if (!currentSession) {
        throw new Error("No current session found");
    }

    return await prisma.registration.create({
        data:{
            userName:userName,
            type: 'SECONDARY',
            origin:'NEW',
            sessionPosition: currentSession.session.currentNumUsers,
            user:{
                connectOrCreate:{
                    where: {
                        characterName_serverId: {
                            characterName:characterName,
                            serverId: currentServer.currentServerId
                        }
                    },
                    create: {
                        characterName: characterName,
                        lastRegistrationAt: new Date(Date()),
                        server: {
                            connect: {
                                id: currentServer.currentServerId
                            }
                        }
                    }
                }
            },
            session:{
                connect:{
                    id: currentSession.sessionId
                }
            }
        }
    }).then(async (reg) => {
        // increment the count of active registrations
        await prisma.session.update({
            where: {
                id: reg.sessionId
            },
            data: {
                currentNumUsers: {
                    increment: 1
                }
            }
        })
        return reg
    })
}

export const deregister = async (sessionPosition: number): Promise<Session | null> => {
    const { registration, currentSession } = await getRegistrationByPosId(sessionPosition);
    
    // update the registration to set sessionStatus to DEREGISTERED
    const deregistered = await prisma.registration.update({
        where: {
            id: registration.id
        },
        data: {
            sessionStatus: 'DEREGISTERED'
        }
    });

    currentSession.session.registrations = currentSession.session.registrations.filter((reg) => reg.sessionPosition != sessionPosition)
    await renumberSecondaries(currentSession)
    //decrement the count of active registrations
    const updatedSession =await prisma.session.update({
        where: {
            id: currentSession.sessionId
        },
        data: {
            currentNumUsers: {
                decrement: 1
            }
        }
    });

    if (!updatedSession) {
        throw new Error("Failed to update session");
    }
    return updatedSession
}   

export const promote = async (sessionPosition: number): Promise<Session | null> => {
    const {registration, currentSession} = await getRegistrationByPosId(sessionPosition);
    if(currentSession.session.registrations.find(reg => reg.sessionPosition == 0 && reg.sessionStatus == 'ACTIVE' && reg.type=='MAIN') )
        await demote(0)

    //change status of secondary registration to promoted
    const oldRegistration = await prisma.registration.update({
        where: {
            id:registration.id
        },
        data:{
                sessionStatus: 'PROMOTED'

            }
    })
    if(!oldRegistration)
        throw new Error('failed to promote user')
    
    //create new main registration with 'upgrade' origin
    const newMainRegistration = await prisma.registration.create({
        data:{
            userName: oldRegistration.userName,
            type: 'MAIN',
            origin: 'Upgrade',
            user:{
                connect:{
                    id:oldRegistration.userId
                }
            },
            session:{
                connect:{
                    id:oldRegistration.sessionId
                }
            }
        }
    })
    if (!newMainRegistration)
        throw new Error('upgrade failed')

    const updatedCurrentSession = await prisma.currentSession.findFirst({
        include:{
            session:{
                include:{
                    registrations: true
                }
            }
        }
    })

    if(!updatedCurrentSession)
        throw new Error(`Couldn't grab session`)

    renumberSecondaries(updatedCurrentSession)
    return currentSession.session
}

export const demote = async (sessionPosition: number): Promise<Session | null> => {
    const {registration, currentSession} = await getRegistrationByPosId(sessionPosition);

    //change status of main registration to DEMOTED (to remove it allow it to be counted)
    const oldRegistration = await prisma.registration.update({
        where: {
            id:registration.id
        },
        data:{
                sessionStatus: 'DEMOTED'

            }
    })
    if(!oldRegistration)
        throw new Error(`failed to demote user ${registration}`)
    
    //create new seconday registration with 'downgrade' origin
    const newSecondaryRegistration = await prisma.registration.create({
        data:{
            userName: oldRegistration.userName,
            type: 'SECONDARY',
            origin: 'Downgrade',
            user:{
                connect:{
                    id:oldRegistration.userId
                }
            },
            session:{
                connect:{
                    id:oldRegistration.sessionId
                }
            }
        }
    })
    if (!newSecondaryRegistration)
        throw new Error('Demotion failed')

    //make the in-memory information match what's in the database before we renumber
    const newSessionInfo = await prisma.currentSession.findFirst({
        include:{
            session:{
                include:{
                    registrations:true
                }
            }
        }
    })

    await renumberSecondaries(currentSession)
    return currentSession.session
}

async function renumberSecondaries(currentSession: { session: { registrations: Registration[]} }) {
    const activeSecondaryRegistrations:Registration[] = currentSession.session.registrations.filter((registration:Registration) => {
        return registration.type == 'SECONDARY' && registration.sessionStatus == 'ACTIVE';
    });
    //renumber secondaries
    const renumbered = activeSecondaryRegistrations.map((reg, index) => {
        reg.sessionPosition = index +1
        return reg
    })

    for (const reg of renumbered) {
        const updated = await prisma.registration.update({
            where:{
                id: reg.id
            },
            data:{
                sessionPosition: reg.sessionPosition
            }
        })
        console.log(updated)
    };
}

async function getRegistrationByPosId(sessionPosition: number) {
    const currentSession = await prisma.currentSession.findFirst({
        include: {
            session: {
                include: {
                    registrations: true
                }
            }
        }
    });
    if (!currentSession) {
        throw new Error("No current session found");
    }

    // find the registration at the specified session position
    const registration = await prisma.registration.findFirst({
        where: {
            sessionId: currentSession.sessionId,
            sessionPosition: sessionPosition,
            sessionStatus: 'ACTIVE'
        }
    });

    if (!registration) {
        throw new Error("No registration found at the specified session position");
    }
    return { registration, currentSession };
}
