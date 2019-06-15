import BaseController from "./BaseController";
import BlogService from "../services/BlogService";

export default class ScheduleController extends BaseController {
    constructor(service:BlogService = new BlogService()) {
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
