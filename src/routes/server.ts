import { Router } from 'express';
import { getAllServers, setCurrentServer } from '../controllers/server';

const serverRouter = Router();

serverRouter.route('/').
    get(async (req, res) => {
        res.json(await getAllServers());

    });

serverRouter.route('/:serverName').
    post(async (req, res) =>{
        const serverName = req.params.serverName;
        res.json(await setCurrentServer(serverName))
    })

serverRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));

export default serverRouter;