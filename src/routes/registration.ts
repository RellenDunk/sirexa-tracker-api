import { Router } from "express";

const registrationRouter = Router();

registrationRouter.route('/').
    get((req, res) => res.send('Display registration information'));

registrationRouter.route('/main').
    post((req, res) => {
        const userName = req.query.uName || 'defaultUser';
        const charName = req.query.cName || req.query.uName;
        res.send(`Register user with name: ${userName}`);
    });
registrationRouter.route('/secondary/:userName').
    post((req, res) => {
        const userName = req.params.userName;
        res.send(`Register secondary user with name: ${userName}`);
      });

export default registrationRouter;