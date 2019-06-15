import BaseRouter from "./BaseRouter";
import BaseController from "../controllers/BaseController";
import { Request, Response } from "express";

export default abstract class BaseCrudRouter extends BaseRouter {
    protected controller:BaseController;

    constructor(controller:BaseController) {        
        super();
        
        this.controller = controller;
        
        this.router.get("/", (req:Request, res:Response) => {
            this.controller.getAll(req, res);
        });

        this.router.get("/:id", (req:Request, res:Response) => {
            this.controller.getOne(req, res);
        });

        this.router.delete("/:id", (req:Request, res:Response) => {
             this.controller.deleteOne(req, res);
        });

        this.router.put("/:id", (req:Request, res:Response) => {
            this.controller.update(req, res);
        });

        this.router.post("/", (req:Request, res:Response) => {
            console.log("...1");
            this.controller.create(req, res);
        });
    }
}
