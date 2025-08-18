import { Router } from 'express';
import serverRouter from './server';
import userRouter from './user';

export function setRoutes(app: Router) {
    app.use('/server', serverRouter);
    app.use('/user', userRouter);
    app.use('/', (req, res) => {
        res.send('Welcome to the API');
    });
}