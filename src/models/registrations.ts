import prisma from "../db/connection"
import { Registration, RegistrationOrigin, UserTiers } from "../generated/prisma"

export const getRegistrationsByUserIdAndOrigins = async(userId:string, types:RegistrationOrigin[], serverId:string) => {
    const registrations = await prisma.registration.findMany({
        where: {
            userId: userId,
            origin: {
                in: types
            }
        }
    })
    if(!registrations)
        throw new Error(`couldn't get registrations for userId:${userId} of types:${types}`)
    else
        return registrations
}

export const groupRegistrationsByOrigin = (registrations: Registration[]) =>{
    return registrations.reduce((acc, reg) =>{
        const originType = reg.origin
        if(!acc[originType]){
            acc[originType]=[]
        }
        acc[originType].push(reg)
        return acc
    }, {} as RegistrationsByOrigin)
}

export const updateUserTier = async (id: string, tier: UserTiers  )=>{  
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            tier: tier
        }
    });
}


export type RegistrationsByOrigin = Record<RegistrationOrigin, Registration[]>
