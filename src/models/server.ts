import prisma from "../db/connection";
import { CurrentServer } from "../generated/prisma";

class Server {
    id: String;
    users: User[];
    sessions: Session[];
    name: String;

    currentSever: CurrentServer[];

    constructor(id: String, users: User[], sessions: Session[], name: String, currentServer: CurrentServer[]) {
        this.id = id;
        this.users = users;
        this.sessions = sessions;
        this.name = name;
        this.currentSever = currentServer;

    }

    async getAllServers() {
        const servers = await prisma.server.findMany({
            include: {
                users: true,
                sessions: true,
                currentServer: true,
                name: true
            }
        });
        return servers;
    }