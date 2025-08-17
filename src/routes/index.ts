import { Router } from 'express';
import serverRouter from './server';
import userRouter from './user';

export function setRoutes(app: Router) {
    app.use('/server', serverRouter);
    app.use('/user', userRouter);
}