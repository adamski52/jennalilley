import AuthRouter from "./AuthRouter";
import BaseRouter from "./BaseRouter";
import UsersRouter from "./UsersRouter";
import ScheduleRouter from "./ScheduleRouter";
import BlogRouter from "./BlogRouter";
import AboutRouter from "./AboutRouter";
import ContactRouter from "./ContactRouter";
import UploadRouter from "./UploadRouter";
import WhoAmIRouter from "./WhoAmIRouter";

export default class APIRouter extends BaseRouter {
    constructor() {
        super();
        
        this.router.use("/auth", new AuthRouter().getRouter());
        this.router.use("/users", new UsersRouter().getRouter());
        this.router.use("/schedule", new ScheduleRouter().getRouter());
        this.router.use("/blogs", new BlogRouter().getRouter());
        this.router.use("/about", new AboutRouter().getRouter());
        this.router.use("/contact", new ContactRouter().getRouter());
        this.router.use("/uploads", new UploadRouter().getRouter());
        this.router.use("/whoami", new WhoAmIRouter().getRouter());
    }
}
