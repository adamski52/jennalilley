import passport from "passport";
import passportJwt from "passport-jwt";
import AppConfig from "../AppConfig";
import UserService from "../../services/UserService";

export default class JWTConfig {
    private options = {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: AppConfig.getConfig().get("authentication.token.secret"),
        issuer: AppConfig.getConfig().get("authentication.token.issuer"),
        audience: AppConfig.getConfig().get("authentication.token.audience")
    };

    constructor(userService:UserService = new UserService()) {
        passport.use(new passportJwt.Strategy(this.options, async (payload, done) => {
            let user = await userService.getUserById(payload.sub);
            if (user) {
                return done(null, user, payload);
            }

            return done(null);
        }));
    }
}
