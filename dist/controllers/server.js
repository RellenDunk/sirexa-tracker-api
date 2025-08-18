"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
class ServerController {
    async listServers(req, res) {
        const result = await connection_1.default.server.findMany();
        res.json(result);
    }
    async setCurrentServer(req, res) {
        const serverName = req.params.serverName;
        // Logic to set current server or create a new one if it doesn't exist
        res.send(`Set Current Server to name, create new server if doesn't exist: ${serverName}`);
    }
    async getCurrentServer(req, res) {
        // Logic to get the current server
        res.send('Get Current Server');
    }
}
