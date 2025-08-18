"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demote = exports.promote = exports.deregister = exports.registerSecondary = exports.registerMain = exports.getAllRegistrations = void 0;
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
        }).then(() => {
            // increment the count of active registrations)
            return connection_1.default.session.update({
                where: {
                    id: reg.sessionId
                },
                data: {
                    currentNumUsers: {
                        increment: 1
                    }
                }
            });
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
            sessionPosition: currentSession.currentSession.currentNumUsers,
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
    }).then(async (reg) => {
        // increment the count of active registrations
        await connection_1.default.session.update({
            where: {
                id: reg.sessionId
            },
            data: {
                currentNumUsers: {
                    increment: 1
                }
            }
        });
        return reg;
    });
};
exports.registerSecondary = registerSecondary;
const deregister = async (sessionPosition) => {
    const { registration, currentSession } = await getRegistrationByPosId(sessionPosition);
    // update the registration to set sessionStatus to DEREGISTERED
    const deregistered = await connection_1.default.registration.update({
        where: {
            id: registration.id
        },
        data: {
            sessionStatus: 'DEREGISTERED'
        }
    });
    await renumberSecondaries(currentSession);
    //decrement the count of active registrations
    const updatedSession = await connection_1.default.session.update({
        where: {
            id: currentSession.sessionId
        },
        data: {
            currentNumUsers: {
                decrement: 1
            }
        }
    });
    if (!updatedSession) {
        throw new Error("Failed to update session");
    }
    return updatedSession;
};
exports.deregister = deregister;
const promote = async (sessionPosition) => {
    const { registration, currentSession } = await getRegistrationByPosId(sessionPosition);
    //change status of secondary registration to promoted
    const oldRegistration = await connection_1.default.registration.update({
        where: {
            id: registration.id
        },
        data: {
            sessionStatus: 'PROMOTED'
        }
    });
    if (!oldRegistration)
        throw new Error('failed to promote user');
    //create new main registration with 'upgrade' origin
    const newMainRegistration = await connection_1.default.registration.create({
        data: {
            userName: oldRegistration.userName,
            type: 'MAIN',
            origin: 'Upgrade',
            User: {
                connect: {
                    id: oldRegistration.userId
                }
            },
            session: {
                connect: {
                    id: oldRegistration.sessionId
                }
            }
        }
    });
    if (!newMainRegistration)
        throw new Error('upgrade failed');
    await renumberSecondaries(currentSession);
    return currentSession.currentSession;
};
exports.promote = promote;
const demote = async (sessionPosition) => {
    const { registration, currentSession } = await getRegistrationByPosId(sessionPosition);
    //change status of secondary registration to promoted
    const oldRegistration = await connection_1.default.registration.update({
        where: {
            id: registration.id
        },
        data: {
            sessionStatus: 'DEMOTED'
        }
    });
    if (!oldRegistration)
        throw new Error('failed to promote user');
    //create new seconday registration with 'downgrade' origin
    const newSecondaryRegistration = await connection_1.default.registration.create({
        data: {
            userName: oldRegistration.userName,
            type: 'SECONDARY',
            origin: 'Downgrade',
            User: {
                connect: {
                    id: oldRegistration.userId
                }
            },
            session: {
                connect: {
                    id: oldRegistration.sessionId
                }
            }
        }
    });
    if (!newSecondaryRegistration)
        throw new Error('upgrade failed');
    await renumberSecondaries(currentSession);
    return currentSession.currentSession;
};
exports.demote = demote;
async function renumberSecondaries(currentSession) {
    const activeSecondaryRegistrations = currentSession.currentSession.registrations.filter((registration) => {
        return registration.type == 'SECONDARY' && registration.sessionStatus == 'ACTIVE';
    });
    //renumber secondaries
    activeSecondaryRegistrations.map(async (reg, index) => {
        return await connection_1.default.registration.update({
            where: {
                id: reg.id
            },
            data: {
                sessionPosition: index + 1
            }
        });
    });
}
async function getRegistrationByPosId(sessionPosition) {
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
    // find the registration at the specified session position
    const registration = await connection_1.default.registration.findFirst({
        where: {
            sessionId: currentSession.sessionId,
            sessionPosition: sessionPosition
        }
    });
    if (!registration) {
        throw new Error("No registration found at the specified session position");
    }
    return { registration, currentSession };
}
