"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportsRouter = (0, express_1.Router)();
reportsRouter.route('/').
    get((req, res) => res.send('Display registration information'));
reportsRouter.route('/topusers').
    post((req, res) => {
    res.send(`users by most registrations`);
});
reportsRouter.route('/bannedusers').
    get((req, res) => {
    res.send(`list of banned users`);
});
reportsRouter.route('/appeals').
    get((req, res) => {
    res.send(`list of ban appeal meetings`);
});
reportsRouter.route('/session/').
    get((req, res) => {
    const userName = req.query.reportType || '';
    res.send('session reports generated based on url queries');
});
reportsRouter.route('');
exports.default = reportsRouter;
