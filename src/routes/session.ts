import { Router } from 'express';
import { formatSessionOutput, getCurrentSession } from '../controllers/session';

const sessionRouter = Router();

sessionRouter.route('/').
    get(async (req, res) =>{
        const currentSession = await getCurrentSession();
        if(!currentSession) {
            return res.status(404).send('No current session found');
        }
        const outputString = formatSessionOutput(currentSession);
        res.send(`CURRENT USERS \n${outputString}`)
    });

sessionRouter.route('/end').
    post((req, res) => res.send(`Sirexa has no registered users`));

sessionRouter.route('/date').
    get((req, res) => {
        const date = req.query.date || 'all dates';
        res.send(`Display information about all sessions for: ${date}`);
    })   
export default sessionRouter;


