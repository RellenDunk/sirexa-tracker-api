"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSession = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getCurrentSession = async () => {
    return await connection_1.default.currrentSession.findFirst({
        include: {
            currentSession: {
                include: {
                    registrations: true
                }
            }
        }
    });
};
exports.getCurrentSession = getCurrentSession;
