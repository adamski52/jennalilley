import BaseCrudRouter from "./BaseCrudRouter";
import { Request, Response } from "express";
import passport from "passport";
import UserController from "../controllers/UserController";

export default class UsersRouter extends BaseCrudRouter {
    constructor(controller:UserController = new UserController()) {
        super(controller);

        this.router.put("/:id/promote", (this.controller as UserController).promote);
        this.router.put("/:id/demote", (this.controller as UserController).demote);
    }
}
   
