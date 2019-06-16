import BaseCrudRouter from "./BaseCrudRouter";
import UploadController from "../controllers/UploadController";

export default class UploadRouter extends BaseCrudRouter {
    constructor(controller:UploadController = new UploadController()) {
        super(controller);
    }
}
