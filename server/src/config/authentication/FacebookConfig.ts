import passport from "passport";
import passportFacebook, { Profile } from "passport-facebook";
import AppConfig from "../AppConfig";
import UserService from "../../services/UserService";

export default class FacebookConfig {
    private config = {
        clientID: AppConfig.getConfig().get("authentication.facebook.clientId"),
        clientSecret: AppConfig.getConfig().get("authentication.facebook.clientSecret"),
        callbackURL: "http://localhost:8080/api/auth/facebook/redirect",
        profileFields: ["id", "emails", "displayName"]
    };

    constructor(userService:UserService = new UserService()) {
        if(this.config.clientID) {
            passport.use(new passportFacebook.Strategy(this.config, async (_accessToken:string, _refreshToken:string, profile:Profile, done) => {
                let user = await userService.getUserByExternalId("facebook", profile.id),
                    email:string = profile.emails === undefined ? "" : profile.emails[0].value;

                if(user) {
                    user = await userService.updateUser(profile.displayName, "facebook", profile.id, email);
                    return done(null, user);
                }

                user = await userService.createUser(profile.displayName, "facebook", profile.id, email);     
                if(!user) {
                    return done("Unable to create user", user);
                }
                
                return done(null, user);
            }));
        }
    }
}
