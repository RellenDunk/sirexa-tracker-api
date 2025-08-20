"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unBanUser = exports.banUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const banUser = async (cName, reason) => {
    const cServer = await connection_1.default.currentServer.findFirst();
    if (!cServer)
        throw new Error('no server set');
    return await connection_1.default.ban.create({
        data: {
            user: {
                connect: {
                    characterName_serverId: {
                        characterName: cName,
                        serverId: cServer.currentServerId
                    }
                }
            }
        }
    });
};
exports.banUser = banUser;
const unBanUser = async (cName, reason) => {
    const cServer = await connection_1.default.currentServer.findFirst();
    if (!cServer)
        throw new Error("no server set");
    const user = await connection_1.default.user.findUnique({
        where: {
            characterName_serverId: {
                characterName: cName,
                serverId: cServer.currentServerId
            }
        }
    });
    if (!user)
        throw (`Couldn't find user to unban`);
    return await connection_1.default.ban.delete({
        where: {
            userId: user.id
        }
    });
};
exports.unBanUser = unBanUser;
// export const getUserByName = async (characterName: string) => {
//     return await prisma.user.findUnique({
//         where: {
//             characterName: characterName
//         }
//     });
// }
// export const mainUserUpsert = async (characterName: string) => {
//     const currentServer = await prisma.currentServer.findFirst({});
//     if(currentServer) {
//         return await prisma.user.upsert({
//             where:{
//                 characterName: characterName
//             },
//             update:{
//                 lastRegistrationAt: new Date(Date()),
//             },
//             create:{
//                 characterName: characterName,
//                 lastRegistrationAt: new Date(Date()),
//                 Server:{
//                     connect:{
//                     id: `${currentServer.id}`
//                     }
//                 }
//             }
//         })
//     }
//     else {
//         throw new Error("No current server found");
//     }
// }
