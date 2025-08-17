import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.route('/').
    get((req, res) => res.send('Server This should list all the servers'));

sessionRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));

sessionRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));

export default sessionRouter;