import mongoose from "mongoose";
import RoleService from "./RoleService";
import AppConfig from "../config/AppConfig";

export default class DatabaseService {  
    private roleService:RoleService;
    
    private auth = {
        username: AppConfig.getConfig().get("database.username"),
        password: AppConfig.getConfig().get("database.password")
    };

    constructor(roleService:RoleService = new RoleService()) {
        this.roleService = roleService;
    }

    public async connect() {
        let url = "mongodb://" + this.auth.username + ":" + this.auth.password + "@db:27017/admin";
        console.log("Connecting to db", url);
        return await mongoose.connect(url, {
            useNewUrlParser: true
        });
    }

    public async initialize() {
        this.roleService.create("USER");
        this.roleService.create("ADMIN");
    }
}
