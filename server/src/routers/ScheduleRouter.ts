import BaseRouter from "./BaseRouter";
import { Request, Response } from "express";
import passport from "passport";
import UserService from "../services/UserService";
import ScheduleService from "../services/ScheduleService";

export default class ScheduleRouter extends BaseRouter {
    constructor() {
        super();
        
        this.router.get("/", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            try {
                let schedules = await ScheduleService.getAll();
                return res.send(schedules);
            }
            catch(e) {
                return res.status(401).send();
            }
        });

        this.router.get("/:id", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            try {
                let schedule = ScheduleService.getById(req.params.id);
                return res.send(schedule);
            }
            catch(e) {
                return res.status(401).send();
            }
        });

        this.router.delete("/:id", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            let isAdmin = UserService.isAdmin(req.user);
            if(!isAdmin) {
                return res.status(401).send();
            }

            let schedule;
            try {
                schedule = await ScheduleService.getById(req.params.id);
            
                try {
                    schedule = await ScheduleService.deleteById(req.params.id);
                    return res.send(schedule);
                } catch(e) {
                    return res.status(400).send();
                }
            }
            catch(e) {
                return res.status(404).send();
            }
        });

        this.router.put("/:id", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            let isAdmin = UserService.isAdmin(req.user);
            if(!isAdmin) {
                return res.status(401).send();
            }

            let schedule;
            try {
                schedule = await ScheduleService.update(req.params.id, req.body.name, req.body.type, req.body.startDateTime, req.body.endDateTime, req.body.capacity, req.body.ageRestrictions, req.body.cost, req.body.location, req.body.description);
                return res.send(schedule);
            }
            catch(e) {
                return res.status(404).send();
            }
        });


        this.router.post("/", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            let isAdmin = UserService.isAdmin(req.user);
            if(!isAdmin) {
                return res.status(401).send();
            }

            let schedule;
            try {
                schedule = ScheduleService.create(req.body.name, req.body.type, req.body.startDateTime, req.body.endDateTime, req.body.capacity, req.body.ageRestrictions, req.body.cost, req.body.location, req.body.description);
                return res.send(schedule);
            }
            catch(e) {
                return res.status(400).send();
            }
        });
    }
}
   
