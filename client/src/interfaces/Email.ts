import { IBase } from "./Base";

export interface IEmail extends IBase {
    message: string;
    email: string;
    name: string;
};
