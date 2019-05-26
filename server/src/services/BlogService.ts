import Blog from "../models/Blog";
import BaseService from "./BaseService";

export default class ScheduleService extends BaseService {
    constructor() {
        super(Blog);
    }
}
