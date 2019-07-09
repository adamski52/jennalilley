import { IRole } from "./Role";
import { IBase } from "./Base";

export interface IUser extends IBase {
    name: string,
    email: string,
    providerName: string,
    providerId: string,
    roles: IRole[]
};
