"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});
const getConnection = () => {
    return pool;
};
exports.getConnection = getConnection;
