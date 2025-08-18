import { Router } from "express";
import { promote, registerMain, registerSecondary, deregister, demote } from "../controllers/registration";

const registrationRouter = Router();

registrationRouter.route('/').
    get((req, res) => res.send('Display registration information'));

registrationRouter.route('/main').
    post(async (req, res) => {
        const userName = req.query.uName || 'defaultUser';
        const charName = req.query.cName || req.query.uName;
        res.json(await registerMain(charName as string,userName as string));
    });

registrationRouter.route('/secondary').
    post(async (req, res) => {
        const userName = req.query.uName || 'defaultUser';
        const charName = req.query.cName || req.query.uName;
        res.json(await registerSecondary(charName as string,userName as string));
    });

registrationRouter.route('/promote/:pos').
    post(async (req, res) => {
        const pos = parseInt(req.params.pos);
        res.json(await promote(pos))
    })

registrationRouter.route('/demote/:pos').
    post(async (req, res) => {
        const pos = parseInt(req.params.pos);
        res.json(await demote(pos))
    })

registrationRouter.route('/deregister/:pos').
    post(async (req, res) => {
        const pos = parseInt(req.params.pos);
        res.json(await deregister(pos))
    }

)

export default registrationRouter;