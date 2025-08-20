"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSessionOutput = exports.endCurrentSesssion = exports.getCurrentSession = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getCurrentSession = async () => {
    return await connection_1.default.currentSession.findFirst({
        include: {
            session: {
                include: {
                    registrations: true
                }
            }
        }
    });
};
exports.getCurrentSession = getCurrentSession;
const endCurrentSesssion = async () => {
    //Set all Active registrations to deregistered
    const currentSession = await connection_1.default.currentSession.findFirst({
        include: {
            session: {
                include: {
                    registrations: true
                }
            }
        }
    });
    if (!currentSession)
        throw ('this error is here to remove null posibility');
    await connection_1.default.registration.updateMany({
        where: {
            sessionId: currentSession.sessionId
        },
        data: {
            sessionStatus: 'DEREGISTERED'
        }
    });
    return await connection_1.default.currentSession.delete({
        where: {
            id: 1
        },
    });
};
exports.endCurrentSesssion = endCurrentSesssion;
const formatSessionOutput = (cSession) => {
    const data = JSON.parse(JSON.stringify(cSession, null, 2));
    const registrations = data.session.registrations;
    const activeRegistrations = registrations.filter((reg) => reg.sessionStatus === 'ACTIVE');
    const outputString = activeRegistrations.sort((reg1, reg2) => reg1.sessionPosition - reg2.sessionPosition).map((reg) => {
        return `${reg.sessionPosition}: ${reg.type} - ${reg.userName}`;
    }).join('\n');
    return outputString;
};
exports.formatSessionOutput = formatSessionOutput;
