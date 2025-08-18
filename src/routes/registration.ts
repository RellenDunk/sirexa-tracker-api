import { Router } from "express";
import { registerMain, registerSecondary } from "../controllers/registration";

const registrationRouter = Router();

registrationRouter.route('/').
    get((req, res) => res.send('Display registration information'));

registrationRouter.route('/main').
    post(async (req, res) => {
        const userName = req.query.uName || 'defaultUser';
        const charName = req.query.cName || req.query.uName;
        res.json(await registerMain(charName as string,userName as string));
    });
registrationRouter.route('/secondary/').
    post(async (req, res) => {
        const userName = req.query.uName || 'defaultUser';
        const charName = req.query.cName || req.query.uName;
        res.json(await registerSecondary(charName as string,userName as string));
    });

export default registrationRouter;