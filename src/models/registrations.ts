import prisma from "../db/connection"
import { RegistrationOrigin } from "../generated/prisma"

export const getRegistrationsByUserAndTypes = async(userId:string, types:RegistrationOrigin[], serverId:string) => {
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
