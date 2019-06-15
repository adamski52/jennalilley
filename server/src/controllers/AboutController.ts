import AboutService from "../services/AboutService";
import BaseController from "./BaseController";
import { Request, Response } from "express";

export default class AboutController extends BaseController {
    constructor(service:AboutService = new AboutService()) {
        super(service, {
            create: {
                requireAdmin: true
            },
            update: {
                requireAdmin: true
            }
        });
    }

    public async getAll(req:Request, res:Response) {
        return await super.getAll(req, res);
    }
}
