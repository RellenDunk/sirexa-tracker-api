"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = require("../controllers/session");
const sessionRouter = (0, express_1.Router)();
sessionRouter.route('/').
    get(async (req, res) => {
    const currentSession = await (0, session_1.getCurrentSession)();
    if (!currentSession) {
        return res.status(404).send('No current session found');
    }
    const outputString = (0, session_1.formatSessionOutput)(currentSession);
    res.send(`CURRENT USERS \n${outputString}`);
});
sessionRouter.route('/end').
    delete(async (req, res) => res.send(await (0, session_1.endCurrentSesssion)()));
sessionRouter.route('/date').
    get((req, res) => {
    const date = req.query.date || 'all dates';
    res.send(`Display information about all sessions for: ${date}`);
});
exports.default = sessionRouter;
