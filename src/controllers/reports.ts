import { stat } from "fs"
import prisma from "../db/connection"
import { Registration, RegistrationOrigin, User, UserTiers } from "../generated/prisma"
import { getAllUsers, getCurrentServer } from "../models/server"


export const getTopUsersReport = async () =>{
    const serverInfo = await getCurrentServer()
    if(!serverInfo)
        throw new Error('This error seems impossible to reach')

    const users = await getAllUsers(serverInfo.id)
    if(!users)
        throw new Error(`no users for server: ID: ${serverInfo.name}, name${serverInfo.name}`)

    const userRegs =await Promise.all(users.map( async (user) => {
        return await prisma.registration.findMany({
            where:{
                userId: user.id,
                origin: 'NEW'
            },
            include:{
                user: true
            }
        })
    }))

    //fix this with a just calling Object.values into a reduce without this nonsense
    const uStats:userStats = userRegs.reduce((acc:userStats, uRegs) =>{
        Object.values(uRegs).forEach((uReg) => {
            const characterName=uReg.user.characterName
            const userName = uReg.userName
            if(!acc[characterName]){
                acc[characterName] = {newRegistrationCount: 0, tier: uReg.user.tier, userNames:{} } 
            }
            if(!acc[characterName].userNames[userName] )
                acc[characterName].userNames[userName] = 0
            acc[characterName].newRegistrationCount++
            acc[characterName].userNames[userName]++
        })

        return acc
    }, {} as userStats)

    const sortedStats = Object.entries(uStats).sort(([ ,value1 ], [,value2])=> value2.newRegistrationCount - value1.newRegistrationCount)


    return Object.values(sortedStats).map(([key, value]) =>{
        const cName = key
        const data = value
        
        const nameString = Object.keys(data.userNames).map((uName)=>{
            return `${uName}`
        }).join(', ')

        return `Character Name: ${cName} - ${data.newRegistrationCount} registrations \n  Tier: ${data.tier} \n\  Usernames: ${nameString}`
    }).join('\n\n')
}
    
type userStats = Record< string, {newRegistrationCount: number, tier: UserTiers, userNames: Record<string, number>}>
type userRegistraion =  { user: User} &Registration[]
