import { Router } from 'express';
import prisma from '../db/connection';

const serverRouter = Router();

serverRouter.route('/').
    get(async (req, res) => {
        const result = await prisma.server.findMany();
        res.json(result);
    });

serverRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));

serverRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));

export default serverRouter;