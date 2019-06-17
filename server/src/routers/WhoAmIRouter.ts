import BaseCrudRouter from "./BaseCrudRouter";
import WhoAmIController from "../controllers/WhoAmIController";

export default class WhoAmIRouter extends BaseCrudRouter {
    constructor(controller:WhoAmIController = new WhoAmIController()) {
        super(controller);
    }
}
