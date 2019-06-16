import BaseController from "./BaseController";
import UserService from "../services/UserService";
import { Request, Response } from "express";
import { IBase } from "../models/Base";
import { IUser } from "../models/User";

export default class UserController extends BaseController {
    constructor(service:UserService = new UserService()) {
        super(service, {
            update: {
                requireAdmin: true
            },
            getOne: {
                requireAdmin: true
            },
            getAll: {
                requireAdmin: true
            },
            deleteOne: {
                requireAdmin: true
            }
        });
    }

    public async deleteOne(req:Request, res:Response) {
        return await this.execute(req, res, this.config.deleteOne, async (req, res) => {
            if(req.params.id === req.user.id) {
                // cant delete yourself
                return res.status(403).json();
            }

            let item = await this.service.deleteById(req.params.id);
            return res.json(item);
        });
    }

    public async promote(req:Request, res:Response) {
        return await this.execute(req, res, this.config.deleteOne, async (req, res) => {
            if(req.params.id === req.user.id) {
                // cant promote yourself
                return res.status(403).json();
            }
        
            let user:IBase | null = await this.service.getById(req.params.id);
            if(!user) {
                return res.status(404).json();
            }

            user = await (this.service as UserService).promoteToAdmin(user as IUser);
            return res.json(user);
        });
    }

    public async demote(req:Request, res:Response) {
        return await this.execute(req, res, this.config.deleteOne, async (req, res) => {
            if(req.params.id === req.user.id) {
                // cant demote yourself
                return res.status(403).json();
            }
        
            let user:IBase | null = await this.service.getById(req.params.id);
            if(!user) {
                return res.status(404).json();
            }

            user = await (this.service as UserService).demoteToUser(user as IUser);
            return res.json(user);
        });
    }
}
