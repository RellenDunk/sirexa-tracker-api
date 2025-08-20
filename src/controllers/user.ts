import prisma from "../db/connection";

export const  banUser = async (cName: string, reason: string) => {

    const cServer = await prisma.currentServer.findFirst()
    if(!cServer)
        throw new Error('no server set')


    return await prisma.ban.create({ 
        data:{
            user:{
                connect:{
                    characterName_serverId:{
                        characterName: cName,
                        serverId: cServer.currentServerId
                    }
                }
            }
        }
    })
}    

export const unBanUser = async(cName:string, reason:string ) =>{
    const cServer = await prisma.currentServer.findFirst()
    if(!cServer)
        throw new Error("no server set")

    const user = await prisma.user.findUnique({
        where:{
            characterName_serverId:{
                characterName:cName,
                serverId: cServer.currentServerId
            }
        }
    })

    return await prisma.ban.create({
        data:{
            reason: reason,
            user:{
                connect:{
                    user
                }
            }
        }
    })

}

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