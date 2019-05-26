import BaseService from "../services/BaseService";
import { Request, Response } from "express";
import UserService from "../services/UserService";
import BaseRouter from "./BaseRouter";

export default abstract class BaseCrudRouter extends BaseRouter {
    protected service:BaseService;
    protected userService:UserService;

    constructor(userService:UserService, service:BaseService) {        
        super();
        
        this.userService = userService;
        this.service = service;

        this.router.get("/", async (req:Request, res:Response) => {
            try {
                let items = await this.service.getAll();
                return res.send(items);
            }
            catch(e) {
                return res.status(401).send();
            }
        });

        // this.router.get("/:id", passport.authenticate(["jwt"], {
            // session: false
        this.router.get("/:id", async (req:Request, res:Response) => {
            try {
                let item = this.service.getById(req.params.id);
                return res.send(item);
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

            let item;
            try {
                item = await this.service.getById(req.params.id);
            
                try {
                    item = await this.service.deleteById(req.params.id);
                    return res.send(item);
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

            let item;
            try {
                item = await this.service.update(req.params.id, req.body);
                return res.send(item);
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

            let item;
            try {
                item = await this.service.create(req.body);
                return res.send(item);
            }
            catch(e) {
                return res.status(400).send();
            }
        });
    }

    public getRouter() {
        return this.router;
    }
}
