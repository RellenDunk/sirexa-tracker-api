"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registration_1 = require("../controllers/registration");
const registrationRouter = (0, express_1.Router)();
registrationRouter.route('/').
    get((req, res) => res.send('Display registration information'));
registrationRouter.route('/main').
    post(async (req, res) => {
    const userName = req.query.uName || 'defaultUser';
    const charName = req.query.cName || req.query.uName;
    res.json(await (0, registration_1.registerMain)(charName, userName));
});
registrationRouter.route('/secondary/').
    post(async (req, res) => {
    const userName = req.query.uName || 'defaultUser';
    const charName = req.query.cName || req.query.uName;
    res.json(await (0, registration_1.registerSecondary)(charName, userName));
});
exports.default = registrationRouter;
