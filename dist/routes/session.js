"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionRouter = (0, express_1.Router)();
sessionRouter.route('/').
    get((req, res) => res.send('Display current sesssion information'));
sessionRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));
exports.default = sessionRouter;
