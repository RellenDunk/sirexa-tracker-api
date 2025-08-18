import { Router } from 'express';

const serverRouter = Router();
const serverController = require('../controllers/server');

serverRouter.route('/').
    get((req, res) => serverController.listServers(req, res));

serverRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));

serverRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));

export default serverRouter;