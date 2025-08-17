import { Router } from 'express';
import IndexController from '../controllers';

const router = Router();
const indexController = new IndexController();

export function setRoutes(app: Router) {
    app.get('/trackers', indexController.getTrackers.bind(indexController));
    app.post('/trackers', indexController.createTracker.bind(indexController));
}