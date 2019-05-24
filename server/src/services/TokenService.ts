import jwt from "jsonwebtoken";
import AppConfig from "../config/AppConfig";

export default class TokenService {
    public static generateAccessToken(userId:number|string) {
        const expiresIn = "1 day";
        const audience = AppConfig.getConfig().get("authentication.token.audience");
        const issuer = AppConfig.getConfig().get("authentication.token.issuer");
        const secret = AppConfig.getConfig().get("authentication.token.secret");

        const token = jwt.sign({}, secret, {
            expiresIn: expiresIn,
            audience: audience,
            issuer: issuer,
            subject: userId.toString()
        });

        return token;
    }
};
