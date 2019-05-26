import BaseRouter from "./BaseRouter";
import { Request, Response } from "express";
import passport from "passport";
import UserService from "../services/UserService";
import ScheduleService from "../services/ScheduleService";

export default class ScheduleRouter extends BaseRouter {
    private scheduleService:ScheduleService;
    constructor(scheduleService:ScheduleService = new ScheduleService()) {
        super();

        this.scheduleService = scheduleService;
        
        //this.router.get("/", passport.authenticate(["jwt"], {
            // session: false
        this.router.get("/", async (req:Request, res:Response) => {
            try {
                let schedules = await this.scheduleService.getAll();
                return res.send(schedules);
            }
            catch(e) {
                return res.status(401).send();
            }
        });

        // this.router.get("/:id", passport.authenticate(["jwt"], {
            // session: false
        this.router.get("/:id", async (req:Request, res:Response) => {
            try {
                let schedule = this.scheduleService.getById(req.params.id);
                return res.send(schedule);
            }
            catch(e) {
                return res.status(401).send();
            }
        });

        // this.router.delete("/:id", passport.authenticate(["jwt"], {
        //     session: false
        this.router.delete("/:id", async (req:Request, res:Response) => {
            // let isAdmin = UserService.isAdmin(req.user);
            // if(!isAdmin) {
                // return res.status(401).send();
            // }

            let schedule;
            try {
                schedule = await this.scheduleService.getById(req.params.id);
            
                try {
                    schedule = await this.scheduleService.deleteById(req.params.id);
                    return res.send(schedule);
                } catch(e) {
                    return res.status(400).send();
                }
            }
            catch(e) {
                return res.status(404).send();
            }
        });

        // this.router.put("/:id", passport.authenticate(["jwt"], {
        //     session: false
        this.router.put("/:id", async (req:Request, res:Response) => {
            // let isAdmin = UserService.isAdmin(req.user);
            // if(!isAdmin) {
                // return res.status(401).send();
            // }

            let schedule;
            try {
                schedule = await this.scheduleService.update(req.params.id, req.body);
                return res.send(schedule);
            }
            catch(e) {
                return res.status(404).send();
            }
        });


        //this.router.post("/", passport.authenticate(["jwt"], {
            // session: false
        this.router.post("/", async (req:Request, res:Response) => {
            // let isAdmin = UserService.isAdmin(req.user);
            // if(!isAdmin) {
                // return res.status(401).send();
            // }

            let schedule;
            try {
                schedule = await this.scheduleService.create(req.body);
                return res.send(schedule);
            }
            catch(e) {
                return res.status(400).send();
            }
        });
    }
}
   
