import BaseController from "./BaseController";
import SignupService from "../services/SignupService";

export default class SignupController extends BaseController {
    constructor(service:SignupService = new SignupService()) {
        super(service, {
            create: {
                requireAuth: true
            },
            update: {
                requireAuth: true
            },
            deleteOne: {
                requireAuth: true
            },
            getOne: {
                requireAuth: true
            },
            getAll: {
                requireAuth: true
            }
        });
    }
}
