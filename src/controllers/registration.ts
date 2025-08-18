import { create } from "domain";
import prisma from "../db/connection";
import { Registration } from "../generated/prisma";

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
            User:{
                connectOrCreate:{
                    create: {
                        characterName: characterName,
                        lastRegistrationAt: new Date(Date()),
                        Server: {
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
                    Server:{
                        connect:{
                            id: currentServer.currentServerId
                        }
                    },
                }
            },
            sessionLog:{
                create:{
                    Server:{
                        connect:{
                            id: currentServer.currentServerId
                        }
                    },
                }
            }
        }
    }).then(async (reg) => {
        await prisma.currrentSession.upsert({
            where:{
                currentSessionId: 1
            },
            update:{
                currentSession:{
                    connect:{
                        id: reg.sessionId
                    }
                }
            },
            create:{
                currentSession:{
                    connect:{
                        id: reg.sessionId
                    }
                }
            }
        })
        return reg;
    }) 
}

export const registerSecondary = async (characterName: string, userName: string): Promise<Registration> => {
    const currentServer = await prisma.currentServer.findFirst();
    if (!currentServer) {
        throw new Error("No current server found");
    }
    const currentSession = await prisma.currrentSession.findFirst({
        include:{
            currentSession:{
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
            sessionPosition: currentSession.currentSession.registrations.length,
            User:{
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
                        Server: {
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
            },
            sessionLog:{
                connect:{
                    id: currentSession.sessionId
                }
            }
        }
    })
}