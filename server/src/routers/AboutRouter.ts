import BaseCrudRouter from "./BaseCrudRouter";
import AboutController from "../controllers/AboutController";

export default class AboutRouter extends BaseCrudRouter {
    constructor(controller:AboutController = new AboutController()) {
        super(controller);
    }
}
