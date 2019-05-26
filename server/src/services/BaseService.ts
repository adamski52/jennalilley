import { IBase } from "../models/Base";
import { Model } from "mongoose";

export default abstract class BaseService {
    private model:Model<IBase>;
    
    constructor(model:Model<IBase>) {
        this.model = model;
    }

    public async getById(id:string) {
        console.log("get by id", id);
        return await this.model.findOne({
            _id: id
        });
    }

    public async deleteById(id:string) {
        console.log("delete by id", id);
        return await this.model.deleteOne({
            _id: id
        });
    }

    public async getAll() {
        console.log("get all");
        return await this.model.find();
    }
    
    public async update(id:string, body:IBase) {
        console.log("update", id, body);
        let item = await this.getById(id);
        if(!item) {
            return this.create(body);
        }

        item = Object.assign({}, item, body, {
            _id: item._id
        });
        
        return item.save();
    }

    public async create(body:IBase) {
        console.log("create", body);
        let item = await this.model.create(body);

        return item;
    }
}
