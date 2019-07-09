import { IBase } from "./Base";

export interface IContact extends IBase {
    content: string;
    email: string;
    phone: string;
    facebook: string;
    twitter: string;
    instagram: string;
};
