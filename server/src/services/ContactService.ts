import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import Contact from "../models/Contact";
import { Model } from "mongoose";

export default class ContactService extends BaseService {
    constructor(model:Model<IBase> = Contact) {
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
