import BaseRouter from "./BaseRouter";
import { Request, Response } from "express";
import passport from "passport";
import UserService from "../services/UserService";
import BlogService from "../services/BlogService";

export default class ScheduleRouter extends BaseRouter {
    constructor() {
        super();
        
        //this.router.get("/", passport.authenticate(["jwt"], {
            // session: false
        this.router.get("/", async (req:Request, res:Response) => {
            try {
                let blogs = await BlogService.getAll();
                return res.send(blogs);
            }
            catch(e) {
                return res.status(401).send();
            }
        });

        // this.router.get("/:id", passport.authenticate(["jwt"], {
            // session: false
        this.router.get("/:id", async (req:Request, res:Response) => {
            try {
                let blog = BlogService.getById(req.params.id);
                return res.send(blog);
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

            let blog;
            try {
                blog = await BlogService.getById(req.params.id);
            
                try {
                    blog = await BlogService.deleteById(req.params.id);
                    return res.send(blog);
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

            let blog;
            try {
                blog = await BlogService.update(req.params.id, req.body.title, req.body.startDateTime, req.body.endDateTime, req.body.content);
                return res.send(blog);
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

            let blog;
            try {
                blog = await BlogService.create(req.body.title, req.body.startDateTime, req.body.endDateTime, req.body.content);
                return res.send(blog);
            }
            catch(e) {
                return res.status(400).send();
            }
        });
    }
}
   
