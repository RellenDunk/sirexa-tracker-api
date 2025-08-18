import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.route('/').
    get((req, res) => res.send('Display current sesssion information'));

sessionRouter.route('/end').
    post((req, res) => res.send(`Sirexa has no registered users`));

sessionRouter.route('/date').
    get((req, res) => {
        const date = req.query.date || 'all dates';
        res.send(`Display information about all sessions for: ${date}`);
    })   
export default sessionRouter;