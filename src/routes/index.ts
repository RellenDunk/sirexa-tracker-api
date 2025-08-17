import { Router } from 'express';
import serverRouter from './server';

export function setRoutes(app: Router) {
    app.use('/server', serverRouter);
    app.use('/username',usernameRouter);
}