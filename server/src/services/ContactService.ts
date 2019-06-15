import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import Contact from "../models/Contact";

export default class ContactService extends BaseService {
    constructor() {
        super(Contact);
    }

    public async create(body:IBase) {
        let items = await this.getAll();
        items.forEach(async (item) => {
            await this.deleteById(item._id);
        });
        
        return await this.model.create(body);
    }
}
