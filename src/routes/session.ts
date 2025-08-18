import { Router } from 'express';
import { getCurrentSession } from '../controllers/session';

const sessionRouter = Router();

sessionRouter.route('/').
    get(async (req, res) =>{
        const currentSession = await getCurrentSession();
        if(!currentSession) {
            return res.status(404).send('No current session found');
        }
        const data = JSON.parse(JSON.stringify(currentSession, null, 2));
        const registrations = data.currentSession.registrations;
        const outputString = registrations.map((reg: 
            { id: string,userName: string, startedAt: string, endedAt: string, type: string, origin: string, sessionPosition: number,userId: string,sessionId: string}) => {
            return `${reg.sessionPosition}: ${reg.type} - ${reg.userName}`;
        }).join('\n');
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