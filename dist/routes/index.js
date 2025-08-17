"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = setRoutes;
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const router = (0, express_1.Router)();
const indexController = new controllers_1.default();
function setRoutes(app) {
    app.get('/trackers', indexController.getTrackers.bind(indexController));
    app.post('/trackers', indexController.createTracker.bind(indexController));
}
