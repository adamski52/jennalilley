import BaseCrudRouter from "./BaseCrudRouter";
import EmailController from "../controllers/EmailController";

export default class EmailRouter extends BaseCrudRouter {
    constructor(controller:EmailController = new EmailController()) {
        super(controller);
    }
}
   
