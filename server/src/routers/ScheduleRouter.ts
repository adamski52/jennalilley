import BaseCrudRouter from "./BaseCrudRouter";
import UserService from "../services/UserService";
import ScheduleService from "../services/ScheduleService";

export default class ScheduleRouter extends BaseCrudRouter {
    constructor(userService:UserService = new UserService(), scheduleService:ScheduleService = new ScheduleService()) {
        super(userService, scheduleService);
    }
}
   
