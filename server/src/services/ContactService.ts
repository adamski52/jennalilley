import BaseService from "./BaseService";
import { IBase } from "../models/Base";
import Contact from "../models/Contact";

export default class ContactService extends BaseService {
    constructor() {
        super(Contact);
    }

    public async create(body:IBase) {
        // delete any which exist and create a new one.  we only want one entry, ever.
        console.log("delete all then create");
        let contactItems = await this.getAll();
        contactItems.forEach(async (item) => {
            await this.deleteById(item._id);
        });
        
        let item = await this.model.create(body);
        return item;
    }
}
