import Role from "../models/Role";

export default class RoleService {        
    public static async getRoleByName(name:string) {
        return await Role.findOne({
            name: name.toUpperCase()
        });
    }

    public static async createRole(name:string) {
        let role = await this.getRoleByName(name);
        if(role) {
            return role;
        }

        return await Role.create({
            name: name.toUpperCase()
        });
    }
}
