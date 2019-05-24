import { Request, Response } from "express";
import BaseRouter from "./BaseRouter";

export default class InsecureRouter extends BaseRouter {
    constructor() {
        super();
        
        this.router.get("/", (req:Request, res:Response) => {
            res.send("Insecure response");
        });
    }
}

