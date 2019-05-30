import BaseCrudRouter from "./BaseCrudRouter";
import UserService from "../services/UserService";
import AboutService from "../services/AboutService";

export default class AboutRouter extends BaseCrudRouter {
    constructor(userService:UserService = new UserService(), aboutService:AboutService = new AboutService()) {
        super(userService, aboutService);
    }
}
   
