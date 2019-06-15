import BaseCrudRouter from "./BaseCrudRouter";
import ContactController from "../controllers/ContactController";

export default class ContactRouter extends BaseCrudRouter {
    constructor(controller:ContactController = new ContactController()) {
        super(controller);
    }
}
   
