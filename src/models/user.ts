import prisma from '../db/connection'
import {Server} from '../generated/prisma'
export const getUserByName = async (cName:string, server:Server)=>{
    const user = await prisma.user.findUnique({
        where:{
            characterName_serverId:{
                characterName: cName,
                serverId: server.id
            }
        }
    })
    if(!user)
        throw new Error(`couldn't find user ${cName} on server ${server.name}`)
    else
        return user
}