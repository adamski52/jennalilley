import Upload from "../models/Upload";
import BaseService from "./BaseService";

export default class UploadService extends BaseService {
    constructor() {
        super(Upload);
    }
}
