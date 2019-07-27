import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import { Model } from "mongoose";
import Home from "../models/Home";

export default class HomeService extends BaseService {
    constructor(model:Model<IBase> = Home) {
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
