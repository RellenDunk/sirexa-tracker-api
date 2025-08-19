import { Router } from 'express';
import { banUser } from '../controllers/user';

const userRouter = Router();

userRouter.route('/:username').
    get((req, res) => res.send('maybe we can\'t do anything with this'));

userRouter.route('/:cName/ban').
    post(async (req,res) =>{
        const cName:string = req.params.cName
        res.json(await banUser(cName))
    })

userRouter.route('/:cName/unBan')
export default userRouter;


