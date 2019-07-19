import passport from "passport";
import passportFacebook, { Profile } from "passport-facebook";
import AppConfig from "../AppConfig";
import UserService from "../../services/UserService";

export default class FacebookConfig {
    private config = {
        clientID: AppConfig.getConfig().get("authentication.facebook.clientId"),
        clientSecret: AppConfig.getConfig().get("authentication.facebook.clientSecret"),
        callbackURL: "https://www.jennalilley.com/api/auth/facebook/redirect",
        profileFields: ["id", "emails", "displayName"]
    };

    constructor(userService:UserService = new UserService()) {
        if(!this.config.clientID) {
            return;
        }

        passport.use(new passportFacebook.Strategy(this.config, async (_accessToken:string, _refreshToken:string, profile:Profile, done) => {
            let user = await userService.getUserByExternalId("facebook", profile.id),
                email:string = profile.emails === undefined ? "" : profile.emails[0].value;

            if(user) {
                user = await userService.updateFromAuth(profile.displayName, "facebook", profile.id, email);
                return done(null, user);
            }

            try {
                await userService.createFromAuth(profile.displayName, "facebook", profile.id, email);     
                if(!user) {
                    return done(null, false, {
                        message: "Unable to create user"
                    });
                }
            }
            catch(e) {
                return done(null, false, {
                    message: "Unable to create user"
                });
            }
            
            return done(null, user);
        }));
    }
}
