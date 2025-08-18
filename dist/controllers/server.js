"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentServer = exports.getCurrentServer = exports.createServer = exports.getServer = exports.getAllServers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getAllServers = async () => {
    return await connection_1.default.server.findMany();
};
exports.getAllServers = getAllServers;
const getServer = async (serverName) => {
    return await connection_1.default.server.findUnique({
        where: { name: serverName }
    });
};
exports.getServer = getServer;
const createServer = async (serverName) => {
    return await connection_1.default.server.create({
        data: { name: serverName }
    });
};
exports.createServer = createServer;
const getCurrentServer = async () => {
    return await connection_1.default.currentServer.findUnique({ where: { id: 1 } });
};
exports.getCurrentServer = getCurrentServer;
const setCurrentServer = async (serverName) => {
    const server = await connection_1.default.server.upsert({
        where: { name: serverName },
        update: {},
        create: { name: serverName }
    });
    return await connection_1.default.currentServer.upsert({
        where: { id: 1 },
        update: { currentServerId: server.id, currentServerName: server.name },
        create: { currentServerId: server.id, currentServerName: server.name }
    });
};
exports.setCurrentServer = setCurrentServer;
