import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.route('/').
    get((req, res) => res.send('Display current sesssion information'));

sessionRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));

export default sessionRouter;