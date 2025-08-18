"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = require("../controllers/server");
const serverRouter = (0, express_1.Router)();
serverRouter.route('/').
    get(async (req, res) => {
    res.json(await (0, server_1.getAllServers)());
});
serverRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));
serverRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));
exports.default = serverRouter;
