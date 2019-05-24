import User, { IUser } from "../models/User";
import RoleService from "./RoleService";
export default class UserService {
    public static async getUserById(id:string) {
        return await User.findOne({
            _id: id
        });
    }

    public static async deleteById(id:string) {
        return await User.deleteOne({
            _id: id
        });
    }

    public static isAdmin(user:IUser) {
        for(let i = 0; i < user.roles.length; i++) {
            if(user.roles[i].name.toUpperCase() === "ADMIN") {
                return true;
            }
        }

        return false;
    }

    public static async getAll() {
        return await User.find();
    }

    public static async getUserByExternalId(providerName:string, providerId:string) {
        return await User.findOne({
            providerName: providerName,
            providerId: providerId
        });
    }

    public static async updateUser(name: string, providerName:string, providerId:string, email:string) {
        let user = await this.getUserByExternalId(providerName, providerId);
        if(!user) {
            return await this.createUser(name, providerName, providerId, email);
        }

        // console.log("...", user.schema.methods.isAdmin());

        user.email = email;
        user.name = name;
        return await user.save();
    }

    public static async createUser(name: string, providerName:string, providerId:string, email: string) {
        let userRole = await RoleService.getRoleByName("USER");
        // if(!userRole) {
        //     userRole = await RoleService.createRole("USER");
        // }

        return await User.create({
            name: name,
            providerName: providerName,
            providerId: providerId,
            email: email,
            roles: [userRole]
        });
    }
}
