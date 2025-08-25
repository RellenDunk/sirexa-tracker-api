import { Router } from 'express';
import { endCurrentSesssion, formatSessionOutput, getCurrentSession } from '../controllers/session';

const sessionRouter = Router();

sessionRouter.route('/').
    get(async (req, res) =>{
        const currentSession = await getCurrentSession();
        if(!currentSession) {
            return res.status(200).send('No current session found');
        }
        const outputString = formatSessionOutput(currentSession);
        res.send(`CURRENT USERS \n${outputString}`)
    });

sessionRouter.route('/end').
    delete(async (req, res) => res.send(await endCurrentSesssion()));

sessionRouter.route('/date').
    get((req, res) => {
        const date = req.query.date || 'all dates';
        res.send(`Display information about all sessions for: ${date}`);
    })   
export default sessionRouter;


