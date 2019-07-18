import convict from "convict";

export default class AppConfig {
    private static config = convict({
        http: {
            port: {
                doc: "The port to listen on",
                default: 8080,
                env: "PORT"
            }
        },
        database: {
            username: {
                doc: "Database username",
                default: "mongo",
                env: "JNA_MONGO_USERNAME"
            },
            password: {
                doc: "Database password",
                default: "mongo",
                env: "JNA_MONGO_PASSWORD"
            }
        },
        authentication: {
            google: {
                "clientId": {
                    "doc": "The Client ID from Google to use for authentication",
                    "default": "",
                    "env": "JNA_GOOGLE_CLIENTID"
                },
                "clientSecret": {
                    "doc": "The Client Secret from Google to use for authentication",
                    "default": "",
                    "env": "JNA_GOOGLE_CLIENTSECRET"
                }
            },
            facebook: {
                "clientId": {
                    "doc": "The Client ID from Facebook to use for authentication",
                    "default": "",
                    "env": "JNA_FACEBOOK_CLIENTID"
                },
                "clientSecret": {
                    "doc": "The Client Secret from Facebook to use for authentication",
                    "default": "",
                    "env": "JNA_FACEBOOK_CLIENTSECRET"
                }
            },
            token: {
                secret: {
                    doc: "The signing key for the JWT",
                    default: "jennalilley",
                    env: "JNA_JWT_SIGNING_KEY"
                },
                issuer: {
                    doc: "The issuer for the JWT",
                    default: "jennalilley.com"
                },
                audience: {
                    doc: "The audience for the JWT",
                    default: "jennalilley.com"
                }
            }
        }
    }).validate();

    public static getConfig() {
        return this.config;
    }
}
