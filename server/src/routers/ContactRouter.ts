import BaseCrudRouter from "./BaseCrudRouter";
import UserService from "../services/UserService";
import ContactService from "../services/ContactService";

export default class ContactRouter extends BaseCrudRouter {
    constructor(userService:UserService = new UserService(), contactService:ContactService = new ContactService()) {
        super(userService, contactService);
    }
}
   
