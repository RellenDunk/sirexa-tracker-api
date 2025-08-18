"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllServers = getAllServers;
const connection_1 = __importDefault(require("../db/connection"));
async function getAllServers() {
    return await connection_1.default.server.findMany();
}
