import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import { Model } from "mongoose";
import Email from "../models/Email";
import nodemailer from "nodemailer";
import AppConfig from "../config/AppConfig";

export default class EmailService extends BaseService {
    constructor(model:Model<IBase> = Email) {
        super(model);
    }

    private auth = {
        username: AppConfig.getConfig().get("email.username"),
        password: AppConfig.getConfig().get("email.password"),
        host: AppConfig.getConfig().get("email.host"),
        port: AppConfig.getConfig().get("email.port")
    };

    private transporter = nodemailer.createTransport({
        host: this.auth.host,
        port: this.auth.port,
        secure: this.auth.port === 456,
        auth: {
            user: this.auth.username,
            pass: this.auth.password
        }
    });

    public async create(body:IBase) {
        let from = body.email || "noreply@jennalilley.com",
            name = body.name || "JennaLilley.com",
            message = body.message;
            
        return await this.transporter.sendMail({
            from: "\"" + name + "\" <" + from + ">",
            to: "jon.adamski52@gmail.com",
            subject: "Email from JennaLilley.com",
            text: message
        });
    }
}
