import { Request, Response } from 'express';

class IndexController {
    public async getTrackers(req: Request, res: Response): Promise<void> {
        // Logic to retrieve trackers from the database
        res.send('Get all trackers');
    }

    public async createTracker(req: Request, res: Response): Promise<void> {
        // Logic to create a new tracker in the database
        res.send('Create a new tracker');
    }
}

export default IndexController;