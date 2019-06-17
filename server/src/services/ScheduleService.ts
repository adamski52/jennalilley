import Schedule from "../models/Schedule";
import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import { Model } from "mongoose";

export default class ScheduleService extends BaseService {
    constructor(model:Model<IBase> = Schedule) {
        super(model);
    }
}
