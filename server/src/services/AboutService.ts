import About from "../models/About";
import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import { Model } from "mongoose";

export default class AboutService extends BaseService {
    constructor(model:Model<IBase> = About) {
        super(model);
    }

    public async create(body:IBase) {
        let items = await this.getAll();
        items.forEach(async (item) => {
            await this.deleteById(item._id);
        });
        
        return await this.model.create(body);
    }
}
