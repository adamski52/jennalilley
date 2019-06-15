import { IBase } from "../models/Base";
import { Model } from "mongoose";

export default abstract class BaseService {
    protected model:Model<IBase>;
    
    constructor(model:Model<IBase>) {
        this.model = model;
    }

    public async getById(id:string) {
        return await this.model.findOne({
            _id: id
        });
    }

    public async deleteById(id:string) {
        return await this.model.deleteOne({
            _id: id
        });
    }

    public async getAll() {
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
        return await this.model.create(body);
    }
}
