import AuthRouter from "./AuthRouter";
import InsecureRouter from "./InsecureRouter";
import SecureRouter from "./SecureRouter";
import BaseRouter from "./BaseRouter";
import UsersRouter from "./UsersRouter";

export default class APIRouter extends BaseRouter {
    constructor() {
        super();
        
        this.router.use("/auth", new AuthRouter().getRouter());
        this.router.use("/insecure", new InsecureRouter().getRouter());
        this.router.use("/secure", new SecureRouter().getRouter());
        this.router.use("/users", new UsersRouter().getRouter());
    }
}
