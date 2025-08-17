import { Router } from 'express';

const userRouter = Router();

userRouter.route('/:username').
    get((req, res) => res.send('maybe we can\'t do anything with this'));

export default userRouter;