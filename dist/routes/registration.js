"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationRouter = (0, express_1.Router)();
registrationRouter.route('/').
    get((req, res) => res.send('Display registration information'));
registrationRouter.route('/main/:userName').
    post((req, res) => {
    const userName = req.params.userName;
    res.send(`Register user with name: ${userName}`);
});
exports.default = registrationRouter;
