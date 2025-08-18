"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
