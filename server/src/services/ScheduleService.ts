import Schedule from "../models/Schedule";
import BaseService from "./BaseService";

export default class ScheduleService extends BaseService {
    constructor() {
        super(Schedule);
    }
}
