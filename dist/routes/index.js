"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = setRoutes;
const server_1 = __importDefault(require("./server"));
const user_1 = __importDefault(require("./user"));
function setRoutes(app) {
    app.use('/server', server_1.default);
    app.use('/user', user_1.default);
}
