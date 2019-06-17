import Upload from "../models/Upload";
import BaseService from "./BaseService";
import { Model } from "mongoose";
import { IBase } from "../models/Base";

export default class UploadService extends BaseService {
    constructor(model:Model<IBase> = Upload) {
        super(model);
    }
}
