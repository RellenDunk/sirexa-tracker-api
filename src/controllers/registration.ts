import prisma from "../db/connection";
import { Registration } from "../generated/prisma";

export const getAllRegistrations = async (): Promise<Registration[]> => {
    return await prisma.registration.findMany();
}

export const registerMain = async (userId: string, characterName: string, userName: string ): Promise<Registration> => {
    
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
                    where: {
                        characterName: characterName
                    },
                    create: {
                        characterName: characterName,
                        lastRegistrationAt: new Date(Date()),
                        Server: {
                            connect: {
                                id: `${currentServer.currentServerId}`
                            }
                        }
                    }
                }
            },
            session:{
                create:{
                    Server:{
                        connect:{
                            id: `${currentServer.currentServerId}`
                        }
                    }
                }
            }
        }
    }) 
}

export const registerSecondary = async (userId: string, characterName: string, userName: string): Promise<Registration> => {
    const currentServer = await prisma.currentServer.findFirst();
    if (!currentServer) {
        throw new Error("No current server found");
    }
    const currentSession = await prisma.currrentSession.findFirst({
        include:{
            currentSession: true
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
            User:{
                connectOrCreate:{
                    where: {
                        characterName: characterName
                    },
                    create: {
                        characterName: characterName,
                        lastRegistrationAt: new Date(Date()),
                        Server: {
                            connect: {
                                id: `${currentServer.currentServerId}`
                            }
                        }
                    }
                }
            },
            session:{
                connect:{
                    id: `${currentSession.sessionId}`
                }
            }
        }
    })
}