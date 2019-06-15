import Role, { IRole } from "../models/Role";
import { Model } from "mongoose";

export default class RoleService {
    protected model:Model<IRole>;
    
    constructor(model:Model<IRole> = Role) {
        this.model = model;
    }

    public async getByName(name:string) {
        return await this.model.findOne({
            name: name.toUpperCase()
        });
    }

    public async create(name:string) {
        let item = await this.getByName(name);
        
        if(!item) {
            return await this.model.create({
                name: name.toUpperCase()
            });
        }

        return item;
    }
}
