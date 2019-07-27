import AboutService from "../services/AboutService";
import BaseController from "./BaseController";

export default class AboutController extends BaseController {
    constructor(service:AboutService = new AboutService()) {
        super(service, {
            create: {
                requireAdmin: true
            },
            update: {
                disabled: true
            },
            deleteOne: {
                disabled: true
            },
            getOne: {
                disabled: true
            }
        });
    }
}
