import AuthRouter from "./AuthRouter";
import InsecureRouter from "./InsecureRouter";
import SecureRouter from "./SecureRouter";
import BaseRouter from "./BaseRouter";
import UsersRouter from "./UsersRouter";
import ScheduleRouter from "./ScheduleRouter";
import BlogRouter from "./BlogRouter";
import AboutRouter from "./AboutRouter";
import ContactRouter from "./ContactRouter";

export default class APIRouter extends BaseRouter {
    constructor() {
        super();
        
        this.router.use("/auth", new AuthRouter().getRouter());
        this.router.use("/insecure", new InsecureRouter().getRouter());
        this.router.use("/secure", new SecureRouter().getRouter());
        this.router.use("/users", new UsersRouter().getRouter());
        this.router.use("/schedules", new ScheduleRouter().getRouter());
        this.router.use("/blogs", new BlogRouter().getRouter());
        this.router.use("/about", new AboutRouter().getRouter());
        this.router.use("/contact", new ContactRouter().getRouter());
    }
}
