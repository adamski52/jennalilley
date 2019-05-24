import JWTConfig from "./config/authentication/JWTConfig";
import FacebookConfig from "./config/authentication/FacebookConfig";
import GoogleConfig from "./config/authentication/GoogleConfig";
import express, { Application, Request, Response } from "express";
import passport from "passport";
import APIRouter from "./routers/APIRouter";
import AppConfig from "./config/AppConfig";
import cookieParser from "cookie-parser";
import { NextFunction } from "connect";
import DatabaseService from "./services/DatabaseService";
import bodyParser from "body-parser";

export default class Server {
    private static jwtConfig:JWTConfig;
    private static facebookConfig:FacebookConfig;
    private static googleConfig:GoogleConfig;
    private static app:Application;

    public static async init() {
        let instance = await DatabaseService.connect();
        
        if(!instance) {
            console.log("Failed to connect to db. Exiting.");
            process.exitCode = 1;
            return;
        }

        DatabaseService.initialize();

        console.log("Connected to db.");

        this.jwtConfig = new JWTConfig();
        this.facebookConfig = new FacebookConfig();
        this.googleConfig = new GoogleConfig();

        this.app = express();

       
        this.app.use(passport.initialize());
        this.app.use(bodyParser.json())

        this.app.use((_req:Request, res:Response, next:NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        
        this.app.use(cookieParser());
        this.app.use("/api", new APIRouter().getRouter());

        const port = AppConfig.getConfig().get("http.port");
        this.app.listen(port, () => {
            console.log("API Server listening on port " + port);
        });
    }

    public static getApp() {
        return this.app;
    }
    
    public static getJWTConfig() {
        return this.jwtConfig;
    }

    public static getFacebookConfig() {
        return this.facebookConfig;
    }

    public static getGoogleConfig() {
        return this.googleConfig;
    }
}
