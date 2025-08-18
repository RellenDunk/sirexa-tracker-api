"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.route('/:username').
    get((req, res) => res.send('maybe we can\'t do anything with this'));
exports.default = userRouter;
