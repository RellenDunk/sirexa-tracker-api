"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSecondary = exports.registerMain = exports.getAllRegistrations = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getAllRegistrations = async () => {
    return await connection_1.default.registration.findMany();
};
exports.getAllRegistrations = getAllRegistrations;
const registerMain = async (characterName, userName) => {
    const currentServer = await connection_1.default.currentServer.findFirst();
    if (!currentServer) {
        throw new Error("No current server found");
    }
    return await connection_1.default.registration.create({
        data: {
            userName: userName,
            type: 'MAIN',
            origin: 'NEW',
            User: {
                connectOrCreate: {
                    create: {
                        characterName: characterName,
                        lastRegistrationAt: new Date(Date()),
                        Server: {
                            connect: {
                                id: currentServer.currentServerId
                            }
                        }
                    },
                    where: {
                        characterName_serverId: {
                            characterName: characterName,
                            serverId: currentServer.currentServerId
                        }
                    }
                }
            },
            session: {
                create: {
                    Server: {
                        connect: {
                            id: currentServer.currentServerId
                        }
                    },
                }
            },
        }
    }).then(async (reg) => {
        await connection_1.default.currrentSession.upsert({
            where: {
                currentSessionId: 1
            },
            update: {
                currentSession: {
                    connect: {
                        id: reg.sessionId
                    }
                }
            },
            create: {
                currentSession: {
                    connect: {
                        id: reg.sessionId
                    }
                }
            }
        });
        return reg;
    });
};
exports.registerMain = registerMain;
const registerSecondary = async (characterName, userName) => {
    const currentServer = await connection_1.default.currentServer.findFirst();
    if (!currentServer) {
        throw new Error("No current server found");
    }
    const currentSession = await connection_1.default.currrentSession.findFirst({
        include: {
            currentSession: {
                include: {
                    registrations: true
                }
            }
        }
    });
    if (!currentSession) {
        throw new Error("No current session found");
    }
    return await connection_1.default.registration.create({
        data: {
            userName: userName,
            type: 'SECONDARY',
            origin: 'NEW',
            sessionPosition: currentSession.currentSession.registrations.length,
            User: {
                connectOrCreate: {
                    where: {
                        characterName_serverId: {
                            characterName: characterName,
                            serverId: currentServer.currentServerId
                        }
                    },
                    create: {
                        characterName: characterName,
                        lastRegistrationAt: new Date(Date()),
                        Server: {
                            connect: {
                                id: currentServer.currentServerId
                            }
                        }
                    }
                }
            },
            session: {
                connect: {
                    id: currentSession.sessionId
                }
            }
        }
    });
};
exports.registerSecondary = registerSecondary;
