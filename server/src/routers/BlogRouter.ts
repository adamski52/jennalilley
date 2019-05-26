import BaseRouter from "./BaseRouter";
import { Request, Response } from "express";
import passport from "passport";
import UserService from "../services/UserService";
import BlogService from "../services/BlogService";

export default class ScheduleRouter extends BaseRouter {
    private blogService:BlogService;
    constructor(blogService:BlogService = new BlogService()) {
        super();

        this.blogService = blogService;
        
        //this.router.get("/", passport.authenticate(["jwt"], {
            // session: false
        this.router.get("/", async (req:Request, res:Response) => {
            try {
                let blogs = await this.blogService.getAll();
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
                let blog = this.blogService.getById(req.params.id);
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
                blog = await this.blogService.getById(req.params.id);
            
                try {
                    blog = await this.blogService.deleteById(req.params.id);
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
                blog = await this.blogService.update(req.params.id, req.body);
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
                blog = await this.blogService.create(req.body);
                return res.send(blog);
            }
            catch(e) {
                return res.status(400).send();
            }
        });
    }
}
   
