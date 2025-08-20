"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.route('/:username').
    get((req, res) => res.send('maybe we can\'t do anything with this'));
userRouter.route('/:cName/ban').
    post(async (req, res) => {
    const reason = req.query.reason;
    const cName = req.params.cName;
    res.json(await (0, user_1.banUser)(cName, reason));
});
userRouter.route('/:cName/unBan');
exports.default = userRouter;
