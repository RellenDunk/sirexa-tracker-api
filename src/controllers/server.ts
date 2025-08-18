import prisma from '../db/connection';
import { CurrentServer, Server } from '../generated/prisma';

export const getAllServers = async (): Promise<Server[]> => {
    return await prisma.server.findMany(); }

export const getServer = async (serverName: string): Promise<Server | null> => {
    return await prisma.server.findUnique({
        where: { name: serverName }
    });
}

export const createServer = async (serverName: string): Promise<Server> => {
    return await prisma.server.create({
        data: { name: serverName }
    });
}

export const getCurrentServer = async (): Promise<CurrentServer | null> => {
    return await prisma.currentServer.findUnique({where: { id: 1 }});
}

export const setCurrentServer = async (serverName: string): Promise<CurrentServer> => {

    const server = await prisma.server.upsert({
        where: { name: serverName },
        update: {},
        create: { name: serverName }
    })

    return await prisma.currentServer.upsert({
        where: { id: 1 },
        update: { currentServerId: server.id, currentServerName: server.name },
        create: { currentServerId: server.id, currentServerName: server.name }
    });
}