import BaseController from "./BaseController";
import EmailService from "../services/EmailService";

export default class EmailController extends BaseController {
    constructor(service:EmailService = new EmailService()) {
        super(service, {
            update: {
                disabled: true
            },
            deleteOne: {
                disabled: true
            },
            getOne: {
                disabled: true
            },
            getAll: {
                disabled: true
            }
        });
    }
}
