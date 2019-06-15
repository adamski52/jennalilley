import { IBase } from "../models/Base";
import { Model } from "mongoose";

export default abstract class BaseService {
    protected model:Model<IBase>;
    
    constructor(model:Model<IBase>) {
        this.model = model;
    }

    public async getById(id:string) {
        console.log("get by id", id);
        let result = await this.model.findOne({
            _id: id
        });

        console.log(result);

        return result;
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
        return this.model.updateOne({
            _id: id
        }, {
            $set: body
        });
    }

    public async create(body:IBase) {
        console.log("create", body);
        let item = await this.model.create(body);

        return item;
    }
}
