import { Router } from 'express';
import { getAllServers, setCurrentServer, createServer, getCurrentServer } from '../controllers/server';


const serverRouter = Router();

serverRouter.route('/').
    get(async (req, res) => {
        res.json(await getAllServers());

    });
serverRouter.route('/current').
    get(async (req, res) => res.send(await getCurrentServer()));
    
serverRouter.route('/:serverName').
    post(async (req, res) =>{
        const serverName = req.params.serverName;
        res.json(await setCurrentServer(serverName))
    })

export default serverRouter;