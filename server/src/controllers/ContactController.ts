import BaseController from "./BaseController";
import ContactService from "../services/ContactService";

export default class ContactController extends BaseController {
    constructor(service:ContactService = new ContactService()) {
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
