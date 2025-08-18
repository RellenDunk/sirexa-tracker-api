"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionRouter = (0, express_1.Router)();
sessionRouter.route('/').
    get((req, res) => res.send('Display current sesssion information'));
sessionRouter.route('/end').
    post((req, res) => res.send(`Sirexa has no registered users`));
sessionRouter.route('/date').
    get((req, res) => {
    const date = req.query.date || 'all dates';
    res.send(`Display information about all sessions for: ${date}`);
});
exports.default = sessionRouter;
