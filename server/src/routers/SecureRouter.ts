import BaseRouter from "./BaseRouter";
import { Request, Response } from "express";
import passport from "passport";

export default class SecureRouter extends BaseRouter {
    constructor() {
        super();
        
        this.router.get("/", passport.authenticate(["jwt"], {
            session: false
        }), (req:Request, res:Response) => {
            res.send("Secure response from " + JSON.stringify(req.user));
        });
    }
}
   
