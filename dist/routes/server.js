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
    post(async (req, res) => {
    const serverName = req.params.serverName;
    res.json(await (0, server_1.setCurrentServer)(serverName));
});
serverRouter.route('/new/:serverName').
    post(async (req, res) => {
    const serverName = req.params.serverName;
    res.json(await (0, server_1.createServer)(serverName));
});
serverRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));
exports.default = serverRouter;
