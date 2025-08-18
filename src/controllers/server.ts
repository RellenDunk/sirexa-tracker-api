import { Request, Response } from 'express';
import prisma from '../db/connection'; 

class ServerController {
    public async listServers(req: Request, res: Response): Promise<void> {
        const result = await prisma.server.findMany();
        res.json(result);
    }

    public async setCurrentServer(req: Request, res: Response): Promise<void> {
        const serverName = req.params.serverName;
        // Logic to set current server or create a new one if it doesn't exist
        res.send(`Set Current Server to name, create new server if doesn't exist: ${serverName}`);
    }

    public async getCurrentServer(req: Request, res: Response): Promise<void> {
        // Logic to get the current server
        res.send('Get Current Server');
    }
}

