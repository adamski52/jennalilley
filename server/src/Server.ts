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
    private jwtConfig:JWTConfig = new JWTConfig();
    private facebookConfig:FacebookConfig = new FacebookConfig();
    private googleConfig:GoogleConfig = new GoogleConfig();
    private databaseService:DatabaseService = new DatabaseService();
    private app!:Application;;

    public async init() {
        await this.databaseService.connect();
        await this.databaseService.initialize();
        console.log("Connected to db.");

        this.jwtConfig = new JWTConfig();
        this.facebookConfig = new FacebookConfig();
        this.googleConfig = new GoogleConfig();

        let app = express();

        passport.serializeUser((user, done) => {
            done(null, user);
        });
        
        passport.deserializeUser((user, done) => {
            done(null, user);
        });

        app.use(passport.initialize());
        
        app.use(bodyParser.json({
            limit: "50mb"
        }));

        app.use((_req:Request, res:Response, next:NextFunction) => {
            res.setHeader('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        
        app.use(cookieParser());
        app.use("/api", new APIRouter().getRouter());

        const port = AppConfig.getConfig().get("http.port");
        app.listen(port, () => {
            console.log("API Server listening on port " + port);
        });
    }

    public getApp() {
        return this.app;
    }
    
    public getJWTConfig() {
        return this.jwtConfig;
    }

    public getFacebookConfig() {
        return this.facebookConfig;
    }

    public getGoogleConfig() {
        return this.googleConfig;
    }
}
