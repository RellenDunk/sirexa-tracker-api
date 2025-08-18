"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const index_1 = require("./routes/index");
const qs_1 = __importDefault(require("qs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, body_parser_1.json)());
app.set('query parser', (str) => qs_1.default.parse(str, { depth: 5 }));
(0, index_1.setRoutes)(app);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
