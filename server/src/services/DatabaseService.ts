import mongoose from "mongoose";
import RoleService from "./RoleService";

export default class DatabaseService {        
    public static async connect() {
        return await mongoose.connect("mongodb://mongo:mongo@localhost:27017/admin", {
            useNewUrlParser: true
        });
    }

    public static async initialize() {
        RoleService.createRole("USER");
        RoleService.createRole("ADMIN");
    }
}
