import BaseCrudRouter from "./BaseCrudRouter";
import UserService from "../services/UserService";
import BlogService from "../services/BlogService";

export default class BlogRouter extends BaseCrudRouter {
    constructor(userService:UserService = new UserService(), blogService:BlogService = new BlogService()) {
        super(userService, blogService);
    }
}
   
