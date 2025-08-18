import { cursorTo } from 'readline';
import prisma from '../db/connection';
import { CurrentServer, Server } from '../generated/prisma';

const getAllServers = async (): Promise<Server[]> => {
    return await prisma.server.findMany(); }

const getServer = async (serverName: string): Promise<Server | null> => {
    return await prisma.server.findUnique({
        where: { name: serverName }
    });
}

const createServer = async (serverName: string): Promise<Server> => {
    return await prisma.server.create({
        data: { name: serverName }
    });
}

const setCurrentServer = async (serverName: string): Promise<CurrentServer> => {

    const server = await getServer(serverName).then(async server => {
        if (!server) {
            return await createServer(serverName);
        }
        return server;
    })
     return await prisma.currentServer.upsert({
        where: { id: 1 },
        update: { currentServerId: server.id, currentServerName: server.name },
        create: { currentServerId: server.id, currentServerName: server.name }
    })
}