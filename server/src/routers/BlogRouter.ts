import BaseCrudRouter from "./BaseCrudRouter";
import BlogController from "../controllers/BlogController";

export default class BlogRouter extends BaseCrudRouter {
    constructor(controller:BlogController = new BlogController()) {
        super(controller);
    }
}
