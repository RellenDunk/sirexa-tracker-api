"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
const connection_1 = require("../db/connection");
class Tracker {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    async save() {
        const connection = await (0, connection_1.getConnection)();
        await connection.query('INSERT INTO trackers (name, description, created_at, updated_at) VALUES ($1, $2, $3, $4)', [this.name, this.description, this.createdAt, this.updatedAt]);
    }
    static async findAll() {
        const connection = await (0, connection_1.getConnection)();
        const result = await connection.query('SELECT * FROM trackers');
        return result.rows.map((row) => new Tracker(row.id, row.name, row.description));
    }
}
exports.Tracker = Tracker;
