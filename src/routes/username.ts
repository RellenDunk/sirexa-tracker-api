import { Router } from 'express';

const userNameRouter = Router();

userNameRouter.route('/').
    get((req, res) => res.send('Server This should list all the servers'));

userNameRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));

userNameRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));

export default userNameRouter;