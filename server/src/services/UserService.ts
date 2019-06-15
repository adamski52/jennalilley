import User, { IUser } from "../models/User";
import RoleService from "./RoleService";
import { IBase } from "../models/Base";
import BaseService from "./BaseService";

export default class UserService extends BaseService {
    private roleService:RoleService;

    constructor(roleService:RoleService = new RoleService()) {
        super(User);
        this.roleService = roleService;
    }

    public isAdmin(user:IUser) {
        for(let i = 0; i < user.roles.length; i++) {
            if(user.roles[i].name.toUpperCase() === "ADMIN") {
                return true;
            }
        }

        return false;
    }

    public async getUserByExternalId(providerName:string, providerId:string) {
        return await this.model.findOne({
            providerName: providerName,
            providerId: providerId
        });
    }

    public async updateFromAuth(name: string, providerName:string, providerId:string, email:string) {
        let user = await this.getUserByExternalId(providerName, providerId);
        if(!user) {
            return await this.createFromAuth(name, providerName, providerId, email);
        }

        user.email = email;
        user.name = name;
        return await user.save();
    }

    public async createFromAuth(name: string, providerName:string, providerId:string, email: string) {
        let userRole = await this.roleService.getByName("USER");
        if(!userRole) {
            userRole = await this.roleService.getByName("USER");
        }

        return await this.model.create({
            name: name,
            providerName: providerName,
            providerId: providerId,
            email: email,
            roles: [userRole]
        });
    }

    public async promoteToAdmin(user:IUser) {
        let adminRole = await this.roleService.getByName("ADMIN");
        if(!adminRole) {
            adminRole = await this.roleService.create("ADMIN");
        }

        if(!user.roles.includes(adminRole)) {
            user.roles.push(adminRole);
        }

        return await user.save();
    }

    public async demoteToUser(user:IUser) {
        let adminRole = await this.roleService.getByName("ADMIN");
        if(!adminRole) {
            adminRole = await this.roleService.create("ADMIN");
        }

        let roles = user.roles.filter((role) => {
            return role.name !== adminRole!.name;
        });

        user.roles = roles;

        return await user.save();
    }
}
