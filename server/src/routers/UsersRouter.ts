import BaseCrudRouter from "./BaseCrudRouter";
import { Request, Response } from "express";
import UserController from "../controllers/UserController";

export default class UsersRouter extends BaseCrudRouter {
    constructor(controller:UserController = new UserController()) {
        super(controller);

        this.router.put("/:id/promote", (req:Request, res:Response) => {
            (this.controller as UserController).promote(req, res);
        });

        this.router.put("/:id/demote", (req:Request, res:Response) => {
            (this.controller as UserController).demote(req, res);
        });
    }
}
   
