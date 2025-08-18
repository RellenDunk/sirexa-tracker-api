"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = __importDefault(require("../db/connection"));
const serverRouter = (0, express_1.Router)();
serverRouter.route('/').
    get(async (req, res) => {
    const result = await connection_1.default.server.findMany();
    res.json(result);
});
serverRouter.route('/:serverName').
    post((req, res) => res.send(`Set Current Server to name, create new server if doesn't exist: ${req.params.serverName}`));
serverRouter.route('/current').
    get((req, res) => res.send('Get Current Server'));
exports.default = serverRouter;
