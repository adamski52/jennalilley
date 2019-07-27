import BaseCrudRouter from "./BaseCrudRouter";
import HomeController from "../controllers/HomeController";

export default class HomeRouter extends BaseCrudRouter {
    constructor(controller:HomeController = new HomeController()) {
        super(controller);
    }
}
