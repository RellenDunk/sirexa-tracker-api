import { Router } from 'express';
import serverRouter from './server';
import userRouter from './user';
import registrationRouter from './registration';
import sessionRouter from './session';

export function setRoutes(app: Router) {
    app.use('/server', serverRouter);
    app.use('/user', userRouter);
    app.use('/registration', registrationRouter);
    app.use('/session', sessionRouter);
    app.use('/', (req, res) => {
        res.send('Welcome to the API');
    });
}