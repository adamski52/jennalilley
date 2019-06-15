import BaseCrudRouter from "./BaseCrudRouter";
import ScheduleController from "../controllers/ScheduleController";

export default class ScheduleRouter extends BaseCrudRouter {
    constructor(controller:ScheduleController = new ScheduleController()) {
        super(controller);
    }
}
   
