import About from "../models/About";
import BaseService from "./BaseService";
import { IBase } from "../models/Base";

export default class AboutService extends BaseService {
    constructor() {
        super(About);
    }

    public async create(body:IBase) {
        // delete any which exist and create a new one.  we only want one entry, ever.
        console.log("delete all then create");
        let aboutItems = await this.getAll();
        aboutItems.forEach(async (item) => {
            await this.deleteById(item._id);
        });
        
        let item = await this.model.create(body);
        return item;
    }
}
