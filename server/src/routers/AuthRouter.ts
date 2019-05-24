import { Request, Response } from "express";
import passport from "passport";
import TokenService from "../services/TokenService";
import BaseRouter from "./BaseRouter";

export default class AuthRouter extends BaseRouter {
    constructor() {
        super();

        this.router.get("/google/start", passport.authenticate("google", {
            session: false,
            scope: [
                "openid", "profile", "email"
            ]
        }));
        
        this.router.get("/google/redirect", passport.authenticate("google", {
            session: false
        }), (req:Request, res:Response) => {
            res.cookie("TOKEN", TokenService.generateAccessToken(req.user.id));
            console.log("GOOGLE REDIRECT");

            res.redirect("http://localhost:3000");
        });
        
        this.router.get("/facebook/start", passport.authenticate("facebook", {
            session: false,
            scope: [
                "email"
            ]
        }));
        
        this.router.get("/facebook/redirect", passport.authenticate("facebook", {
            session: false
        }), (req:Request, res:Response) => {
            res.cookie("TOKEN", TokenService.generateAccessToken(req.user.id));
            console.log("FACEBOOK REDIRECT");
            res.redirect("http://localhost:3000");
        });
    }
}
