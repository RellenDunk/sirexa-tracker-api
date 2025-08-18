"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSessionOutput = exports.endCurrentSesssion = exports.getCurrentSession = void 0;
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
const endCurrentSesssion = async () => {
    return await connection_1.default.currrentSession.delete({
        where: {
            currentSessionId: 1
        },
    });
};
exports.endCurrentSesssion = endCurrentSesssion;
const formatSessionOutput = (currentSession) => {
    const data = JSON.parse(JSON.stringify(currentSession, null, 2));
    const registrations = data.currentSession.registrations;
    const activeRegistrations = registrations.filter((reg) => reg.sessionStatus === 'ACTIVE');
    const outputString = activeRegistrations.map((reg) => {
        return `${reg.sessionPosition}: ${reg.type} - ${reg.userName}`;
    }).join('\n');
    return outputString;
};
exports.formatSessionOutput = formatSessionOutput;
