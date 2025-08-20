import { Router } from 'express';
import { banUser, unBanUser } from '../controllers/user';
import { getRegistrationsByNameAndType } from '../controllers/registration'
import { RegistrationOrigin } from '../generated/prisma';

const userRouter = Router();

userRouter.route('/').
    all((req,res) => {res.send('User routes')})
userRouter.route('/:username').
    get((req, res) => res.send('maybe we can\'t do anything with this'));

userRouter.route('/:cName/ban').
    post(async (req,res) =>{
        const reason:string = req.query.reason as string
        const cName:string = req.params.cName
        const banResult = await banUser(cName,reason)
        res.send(`User ${cName} is Banned for ${reason}`)
    })

userRouter.route('/:cName/unBan').
    post(async (req,res) =>{
        const cName = req.params.cName
        const unBanResult = await(unBanUser(cName))
        res.send(`user ${cName} is Unbanned`)
    })

userRouter.route('/:cName/registrations').
    post(async (req,res) =>{
        const cName = req.params.cName
        const types = req.query.types as string[] || ['NEW']
        const uCaseTypes = types.map((type)=>{
            return type.toUpperCase() as RegistrationOrigin
        })
        const registrations = await getRegistrationsByNameAndType(cName, uCaseTypes)
        res.send(`${cName} has ${registrations.length} ${types.join(' and ')}`)
    })
export default userRouter;



