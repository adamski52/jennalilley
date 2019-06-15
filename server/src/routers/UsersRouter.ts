import BaseRouter from "./BaseRouter";
import { Request, Response } from "express";
import passport from "passport";
import UserService from "../services/UserService";

export default class UsersRouter extends BaseRouter {
    constructor(userService:UserService = new UserService()) {
        super();

        this.router.get("/", passport.authenticate(["jwt"], {
           session: false
        }), async (req:Request, res:Response) => {
            let isAdmin = userService.isAdmin(req.user);
            if(isAdmin) {
                let users = await userService.getAll();
                return res.json(users);
            }
            return res.status(401).json();
        });

        this.router.get("/:id", passport.authenticate(["jwt"], {
          session: false
        }), async (req:Request, res:Response) => {
            let isAdmin = userService.isAdmin(req.user);
            if(isAdmin || req.params.id === req.user.id) {
                try {
                    let user = await userService.getUserById(req.params.id);
                    if(!user) {
                        throw user;
                    }

                    return res.json(user);
                } catch(e) {
                    return res.status(404).json();
                }
            }
            return res.status(401).json();
        });

        this.router.delete("/:id", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            if(req.params.id === req.user.id) {
                // cant delete yourself silly
                return res.status(403).json();
            }

            let isAdmin = userService.isAdmin(req.user);
            if(!isAdmin) {
                return res.status(401).json();
            }

            let user;
            try {
                console.log("user id", req.params.id, typeof req.params.id);
                user = await userService.getUserById(req.params.id);
                if(!user) {
                    throw user;
                }

                try {
                    user = await userService.deleteById(req.params.id);
                    return res.json(user);
                } catch(e) {
                    return res.status(400).json();
                }
            }
            catch(e) {
                return res.status(404).json();
            }
        });

        this.router.post("/", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            let user;
            try {
                user = userService.createUser(req.body.name, req.body.providerName, req.body.providerId, req.body.email);
                return res.json(user);
            }
            catch(e) {
                return res.status(400).json();
            }
        });

        this.router.put("/:id/promote", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            if(req.params.id === req.user.id) {
                // cant promote yourself silly
                return res.status(403).json();
            }
            
            let isAdmin = userService.isAdmin(req.user);
            if(!isAdmin) {
                return res.status(401).json();
            }

            let user;
            try {
                user = await userService.getUserById(req.params.id);
                if(!user) {
                    throw user;
                }

                try {
                    user = await userService.promoteToAdmin(user);
                    return res.json(user);
                } catch(e) {
                    return res.status(400).json();
                }
            }
            catch(e) {
                return res.status(404).json();
            }
        });

        this.router.put("/:id/demote", passport.authenticate(["jwt"], {
            session: false
        }), async (req:Request, res:Response) => {
            if(req.params.id === req.user.id) {
                // cant demote yourself silly
                return res.status(403).json();
            }
            
            let isAdmin = userService.isAdmin(req.user);
            if(!isAdmin) {
                return res.status(401).json();
            }

            let user;
            try {
                user = await userService.getUserById(req.params.id);
                if(!user) {
                    throw user;
                }

                try {
                    user = await userService.demoteToUser(user);
                    return res.json(user);
                } catch(e) {
                    return res.status(400).json();
                }
            }
            catch(e) {
                return res.status(404).json();
            }
        });
    }
}
   
