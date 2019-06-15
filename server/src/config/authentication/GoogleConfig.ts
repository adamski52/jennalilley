import passport from "passport";
import passportGoogle, { IOAuth2StrategyOptionWithRequest, Profile, VerifyFunction } from "passport-google-oauth";
import AppConfig from "../AppConfig";
import UserService from "../../services/UserService";
import { Request } from "express";

export default class GoogleConfig {    
    private config:IOAuth2StrategyOptionWithRequest = {
        clientID: AppConfig.getConfig().get("authentication.google.clientId"),
        clientSecret: AppConfig.getConfig().get("authentication.google.clientSecret"),
        callbackURL: "http://localhost:8080/api/auth/google/redirect",
        passReqToCallback: true
    };

    constructor(userService:UserService = new UserService()) {
        if (this.config.clientID) {
            passport.use(new passportGoogle.OAuth2Strategy(this.config, async (_request:Request, _accessToken:string, _refreshToken:string, profile:Profile, done:VerifyFunction) => {
                let user = await userService.getUserByExternalId("google", profile.id),
                    email:string = profile.emails === undefined ? "" : profile.emails[0].value;

                if(user) {
                    user = await userService.updateUser(profile.displayName, "google", profile.id, email);
                    return done(null, user);
                }

                user = await userService.createUser(profile.displayName, "google", profile.id, email);     
                if(!user) {
                    return done("Unable to create user", user);
                }
                
                return done(null, user);
            }));
        }
    }
}
