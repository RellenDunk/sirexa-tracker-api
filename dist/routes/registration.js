"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationRouter = (0, express_1.Router)();
registrationRouter.route('/').
    get((req, res) => res.send('Display registration information'));
registrationRouter.route('/main').
    post((req, res) => {
    const userName = req.query.uName || 'defaultUser';
    const charName = req.query.cName || 'unknown realname';
    res.send(`Register user with name: ${uName}`);
});
registrationRouter.route('/secondary/:userName').
    post((req, res) => {
    const userName = req.params.userName;
    res.send(`Register secondary user with name: ${userName}`);
});
exports.default = registrationRouter;
