"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRegistrations = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getAllRegistrations = async () => {
    return await connection_1.default.registration.findMany();
};
exports.getAllRegistrations = getAllRegistrations;
