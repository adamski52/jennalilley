import BaseController from "./BaseController";
import UploadService from "../services/UploadService";

export default class UploadController extends BaseController {
    constructor(service:UploadService = new UploadService()) {
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
