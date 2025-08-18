"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = require("../controllers/server");
const serverRouter = (0, express_1.Router)();
serverRouter.route('/').
    get(async (req, res) => {
    res.json(await (0, server_1.getAllServers)());
});
serverRouter.route('/current').
    get(async (req, res) => res.send(await (0, server_1.getCurrentServer)()));
serverRouter.route('/:serverName').
    post(async (req, res) => {
    const serverName = req.params.serverName;
    res.json(await (0, server_1.setCurrentServer)(serverName));
});
exports.default = serverRouter;
