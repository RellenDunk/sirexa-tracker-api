import prisma from '../db/connection'
import {Server, UserTiers} from '../generated/prisma'
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
export const getTierInfo = (numRegs: number, tierMap = numberToTierMap) => {
    return tierMap[Math.floor(numRegs/10)] || tierMap[0]
}

export const numberToTierMap: nearestTenToTierMap = {
    [0]: {tier: 'BASIC', description: 'Basic sirexa interactions'},
    [10]: {tier: 'PREMIUM', description: 'Settings can be remembered for future registrations'},
    [20]: {tier: 'TRUSTED', description: `Create a password. Password allows secondary registration without Main Registered User's permossion. Cannot be de-registered by Main User. Main User commands are still prioritized`},
    [30]: {tier: 'ELITE', description: 'Personal information is redacted and unable to be shared with users of lower tiers'},
    [40]: {tier: 'PRIORITIZED', description: 'Seek feature enabled. Give Sirexa a phone number or location she will call that number or seek that location when not registered with a Main User. Does not prevent others from registering'},
    [50]: {tier: 'ENFORCER', description: 'Give Sirexa one command to continuously follow when not registered. Only one enforcer command can be registered at a time.'},
    [60]: {tier: 'MIRU', description: 'Most important registered user. Password to become Main User, and demote current Main User. Priority for MIRU will fall on the one who has the most valid number of registrations'},
}
type nearestTenToTierMap = Record <number, {tier:UserTiers , description: string}>