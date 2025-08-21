import prisma from "../db/connection";
import { getCurrentServer } from "./server";

export const  banUser = async (cName: string, reason: string) => {

    const cServer = await prisma.currentServer.findFirst()
    if(!cServer)
        throw new Error('no server set')


    return await prisma.ban.create({ 
        data:{
            reason: reason,
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

export const unBanUser = async(cName:string ) =>{
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

    if(!user)
        throw(`Couldn't find user to unban`)
   return await prisma.ban.delete({
        where:{
            userId: user.id
        }
    })

}

export const getUserRecord = async(cName: string) =>{
    const cServer = await getCurrentServer()
    
    if(cServer)
        return await prisma.user.findUnique({
            where:{
                characterName_serverId:{
                    characterName:cName,
                    serverId: cServer.currentServerId
                }
            }
        })
}

export const changeName = async(cName:string, newName: string) => {
    const cServer = await getCurrentServer()
    if(cServer)
        return await prisma.user.update({ 
            where:{
                characterName_serverId:{
                    characterName:cName,
                    serverId: cServer.currentServerId
                }
            },
            data:{
                characterName: newName
            }
        })
}

