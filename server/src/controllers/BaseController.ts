import BaseService from "../services/BaseService";
import { Request, Response } from "express";
import UserService from "../services/UserService";
import passport = require("passport");

export interface IBaseController {
    getAll(req:Request, res:Response):Promise<Response>;
    getOne(req:Request, res:Response):Promise<Response>;
    deleteOne(req:Request, res:Response):Promise<Response>;
    create(req:Request, res:Response):Promise<Response>;
    update(req:Request, res:Response):Promise<Response>;
}

export interface IControllerConfig {
    getAll?: IMethodConfig;
    getOne?: IMethodConfig;
    deleteOne?: IMethodConfig;
    create?: IMethodConfig;
    update?: IMethodConfig;
}

export interface IMethodConfig {
    requireAuth?: boolean;
    requireAdmin?: boolean;
}

export default abstract class BaseController implements IBaseController {
    protected service:BaseService;
    protected userService:UserService;
    protected config:IControllerConfig;

    constructor(service:BaseService, config:IControllerConfig = {}, userService:UserService = new UserService()) {
        this.service = service;
        this.config = config;
        this.userService = userService;
    }

    protected async execute(req:Request, res:Response, config:IMethodConfig = {}, callback:(req:Request, res:Response) => Promise<Response>) {
        if(config.requireAuth || config.requireAdmin) {
            return await passport.authenticate(["jwt"], {
                session: false
            }, async (err, user) => {
                if(err) {
                    return res.status(400).json(err);
                }

                if(!user) {
                    return res.status(401).json();
                }

                if(config.requireAdmin && !this.userService.isAdmin(user)) {
                    return res.status(401).json();
                }

                req.logIn(user, async (err) => {
                    if(err) {
                        return res.status(400).json(err);
                    }

                    return await callback(req, res);
                });
            })(req, res);
        }

        return await callback(req, res);
    }

    public async getOne(req:Request, res:Response) {
        return await this.execute(req, res, this.config.getOne, async (req, res) => {
            let item = await this.service.getById(req.params.id);
            return res.json(item);
        });
    }

    public async getAll(req:Request, res:Response) {
        return await this.execute(req, res, this.config.getAll, async (req, res) => {
            let items = await this.service.getAll();
            return res.json(items);
        });
    }

    public async deleteOne(req:Request, res:Response) {
        return await this.execute(req, res, this.config.deleteOne, async (req, res) => {
            let item = await this.service.deleteById(req.params.id);
            return res.json(item);
        });
    }

    public async update(req:Request, res:Response) {
        return await this.execute(req, res, this.config.update, async (req, res) => {
            let item = await this.service.update(req.params.id, req.body);
            return res.json(item);
        });
    }

    public async create(req:Request, res:Response) {
        return await this.execute(req, res, this.config.create, async (req, res) => {
            let item = await this.service.create(req.body);
            return res.json(item);
        });
    }
}