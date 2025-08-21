import { Router } from "express";
import { getTopUsersReport } from "../controllers/reports";

const reportsRouter = Router();

reportsRouter.route('/').
    get((req, res) => res.send('Display registration information'));

reportsRouter.route('/topusers').
    get(async (req, res) => {
        const reportArgs=req.query.split
        const topUsersReport = await getTopUsersReport()
        res.send(`TOP USERS: \n\n ${topUsersReport} `);
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
reportsRouter.route('/session/').
    get((req, res) => {
        const userName = req.query.reportType || ''
        res.send('session reports generated based on url queries')
    })
reportsRouter.route('')
export default reportsRouter;