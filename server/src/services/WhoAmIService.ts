import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import { Model } from "mongoose";
import User from "../models/User";

export default class WhoAmIService extends BaseService {
    constructor(model:Model<IBase> = User) {
        super(model);
    }
}
