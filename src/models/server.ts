import prisma from "../db/connection";

export const getCurrentServer = async () => {
    const currentServer = await prisma.currentServer.findFirst()
    if (!currentServer) {
        throw new Error("No current server found")
    }
    const server = await prisma.server.findUnique({
        where:{
            id: currentServer.currentServerId
        }
    })
    if(!server)
        throw new Error(`could find server - name:${currentServer.currentServerName} id: ${currentServer.currentServerId}`)
    return server
}