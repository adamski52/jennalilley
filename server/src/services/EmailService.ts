import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import { Model } from "mongoose";
import Email from "../models/Email";

export default class EmailService extends BaseService {
    constructor(model:Model<IBase> = Email) {
        super(model);
    }
}
