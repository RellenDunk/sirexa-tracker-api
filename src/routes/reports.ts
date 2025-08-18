import { Router } from "express";

const reportsRouter = Router();

reportsRouter.route('/').
    get((req, res) => res.send('Display registration information'));

reportsRouter.route('/topusers').
    post((req, res) => {
        res.send(`users by most registrations`);
    });
reportsRouter.route('/bannedusers').
    get((req, res) => {
        res.send(`list of banned users`);
      });
reportsRouter.route('/appeals').
    get((req, res)  => {
        res.send(`list of ban appeal meetings`);
      }
    )

export default reportsRouter;