import HomeService from "../services/HomeService";
import BaseController from "./BaseController";

export default class HomeController extends BaseController {
    constructor(service:HomeService = new HomeService()) {
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
