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
                return res.json(items);
            }
            catch(e) {
                return res.status(401).json();
            }
        });

        // this.router.get("/:id", passport.authenticate(["jwt"], {
            // session: false
        this.router.get("/:id", async (req:Request, res:Response) => {
            try {
                let item = await this.service.getById(req.params.id);
                return res.json(item);
            }
            catch(e) {
                return res.status(401).json();
            }
        });

        // this.router.delete("/:id", passport.authenticate(["jwt"], {
        //     session: false
        this.router.delete("/:id", async (req:Request, res:Response) => {
            // let isAdmin = UserService.isAdmin(req.user);
            // if(!isAdmin) {
                // return res.status(401).json();
            // }

            let item;
            try {
                item = await this.service.getById(req.params.id);
            
                try {
                    item = await this.service.deleteById(req.params.id);
                    return res.json(item);
                } catch(e) {
                    return res.status(400).json();
                }
            }
            catch(e) {
                return res.status(404).json();
            }
        });

        // this.router.put("/:id", passport.authenticate(["jwt"], {
        //     session: false
        this.router.put("/:id", async (req:Request, res:Response) => {
            // let isAdmin = UserService.isAdmin(req.user);
            // if(!isAdmin) {
                // return res.status(401).json();
            // }

            let item;
            try {
                item = await this.service.update(req.params.id, req.body);
                console.log("result of update", item);
                return res.json(item);
            }
            catch(e) {
                return res.status(404).json();
            }
        });


        //this.router.post("/", passport.authenticate(["jwt"], {
            // session: false
        this.router.post("/", async (req:Request, res:Response) => {
            // let isAdmin = UserService.isAdmin(req.user);
            // if(!isAdmin) {
                // return res.status(401).json();
            // }

            let item;
            try {
                item = await this.service.create(req.body);
                return res.json(item);
            }
            catch(e) {
                return res.status(400).json();
            }
        });
    }

    public getRouter() {
        return this.router;
    }
}
