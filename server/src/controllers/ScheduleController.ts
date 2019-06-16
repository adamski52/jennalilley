import BaseController from "./BaseController";
import ScheduleService from "../services/ScheduleService";

export default class ScheduleController extends BaseController {
    constructor(service:ScheduleService = new ScheduleService()) {
        super(service, {
            create: {
                requireAdmin: true
            },
            update: {
                requireAdmin: true
            },
            deleteOne: {
                requireAdmin: true
            }
        });
    }
}
