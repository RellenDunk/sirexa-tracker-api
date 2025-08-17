"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    async getTrackers(req, res) {
        // Logic to retrieve trackers from the database
        res.send('Get all trackers');
    }
    async createTracker(req, res) {
        // Logic to create a new tracker in the database
        res.send('Create a new tracker');
    }
}
exports.default = IndexController;
