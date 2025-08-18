"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionRouter = (0, express_1.Router)();
sessionRouter.route('/').
    get((req, res) => res.send('Server This should list all the servers'));
sessionRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));
sessionRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));
exports.default = sessionRouter;
