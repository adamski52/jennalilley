import mongoose from "mongoose";
import RoleService from "./RoleService";
import Role from "../models/Role";

export default class DatabaseService {  
    private roleService:RoleService;
    
    constructor(roleService:RoleService = new RoleService()) {
        this.roleService = roleService;
    }

    public async connect() {
        return await mongoose.connect("mongodb://mongo:mongo@localhost:27017/admin", {
            useNewUrlParser: true
        });
    }

    public async initialize() {
        this.roleService.create("USER");
        this.roleService.create("ADMIN");
    }
}
