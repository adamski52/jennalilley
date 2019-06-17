import WhoAmIService from "../services/WhoAmIService";
import BaseController from "./BaseController";
import { Request, Response } from "express";

export default class WhoAmIController extends BaseController {
    constructor(service:WhoAmIService = new WhoAmIService()) {
        super(service, {
            create: {
                disabled: true
            },
            update: {
                disabled: true
            },
            deleteOne: {
                disabled: true
            },
            getAll: {
                requireAuth: true
            },
            getOne: {
                disabled: true
            }
        });
    }

    public async getAll(req:Request, res:Response) {
        return await this.execute(req, res, this.config.getAll, async (req, res) => {
            if(req.user) {
                return res.json(req.user);
            }

            return res.status(401).json();
        });
    }
}
