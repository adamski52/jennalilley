import BaseRouter from "./BaseRouter";
import { Request, Response } from "express";
import passport from "passport";
import UserService from "../services/UserService";

export default class UsersRouter extends BaseRouter {
    constructor() {
        super();
        
        this.router.get("/", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            let isAdmin = UserService.isAdmin(req.user);
            if(isAdmin) {
                let users = await UserService.getAll();
                return res.send(users);
            }
            return res.status(401).send();
        });

        this.router.get("/:id", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            let isAdmin = UserService.isAdmin(req.user);
            if(isAdmin || req.params.id === req.user.id) {
                try {
                    let user = await UserService.getUserById(req.params.id);
                    return res.send(user);
                } catch(e) {
                    return res.status(404).send();
                }
            }
            return res.status(401).send();
        });

        this.router.delete("/:id", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            if(req.params.id === req.user.id) {
                // cant delete yourself silly
                return res.status(401).send();
            }

            let isAdmin = UserService.isAdmin(req.user);
            if(!isAdmin) {
                return res.status(401).send();
            }

            let user;
            try {
                user = await UserService.getUserById(req.params.id);
            
                try {
                    user = await UserService.deleteById(req.params.id);
                    return res.send(user);
                } catch(e) {
                    return res.status(400).send();
                }
            }
            catch(e) {
                return res.status(404).send();
            }
        });


        this.router.post("/", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            let user;
            try {
                user = UserService.createUser(req.body.name, req.body.providerName, req.body.providerId, req.body.email);
                return res.send(user);
            }
            catch(e) {
                return res.status(400).send();
            }

        });
    }
}
   
