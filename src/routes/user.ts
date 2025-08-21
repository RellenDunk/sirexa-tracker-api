import { Router } from 'express';
import { banUser, changeName, getUserRecord, unBanUser } from '../controllers/user';
import { getRegistrationsByNameAndType as getRegistrationsByNameAndOrigin } from '../controllers/registration'
import { RegistrationOrigin } from '../generated/prisma';
import { groupRegistrationsByOrigin} from'../models/registrations'
import { ParsedQs } from 'qs';

const userRouter = Router();

userRouter.route('/').
    all((req,res) => {res.send('User routes')})
userRouter.route('/:cName').
    get(async (req, res) => res.json(await getUserRecord(req.params.cName)));

userRouter.route('/:cName/ban').
    post(async (req,res) =>{
        const reason:string = req.query.reason as string
        const cName:string = req.params.cName
        const canAppeal = yesNoParse(req.query.canAppeal) 
        const banResult = await banUser(cName,reason)
        res.send(`User ${cName} is Banned for ${reason}`)
    })

userRouter.route('/:cName/unBan').
    post(async (req,res) =>{
        const cName = req.params.cName
        const unBanResult = await(unBanUser(cName))
        res.send(`user ${cName} is Unbanned`)
    })
userRouter.route('/:cName/change').
    post(async (req,res) =>{
        const cName = req.params.cName
        const newName = req.query.new as string
        const result = await(changeName(cName, newName))
        res.json(result)
    })

userRouter.route('/:cName/registrations').
    get(async (req,res) =>{
        const cName = req.params.cName
        const types = req.query.origin as string[] || ['NEW']
        const uCaseOrigins = types.map((origin)=>{
            return origin.toUpperCase() as RegistrationOrigin
        })
        const registrations = await getRegistrationsByNameAndOrigin(cName, uCaseOrigins)
        const regsByorigin = groupRegistrationsByOrigin(registrations)

        const registrationOutput = Object.entries(regsByorigin).map(([key, value]) => [`${key}: ${value.length}`]).join('\n')

        res.send(`Registrations for ${cName}: \n ${registrationOutput}`)
    })
export default userRouter;



function yesNoParse(canAppeal: string | ParsedQs | (string | ParsedQs)[] | undefined) {
    if(canAppeal)
        if(canAppeal.toString().toUpperCase() == 'NO')
            return false
        else
            return true
    else
        return null
}

