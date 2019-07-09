import mongoose from "mongoose";
import RoleService from "./RoleService";

export default class DatabaseService {  
    private roleService:RoleService;
    
    constructor(roleService:RoleService = new RoleService()) {
        this.roleService = roleService;
    }

    public async connect() {
        return await mongoose.connect("mongodb://mongo:mongo@db:27017/admin", {
            useNewUrlParser: true
        });
    }

    public async initialize() {
        this.roleService.create("USER");
        this.roleService.create("ADMIN");
    }
}
