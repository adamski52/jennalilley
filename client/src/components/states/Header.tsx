import { IStatus } from "../../util/TypeUtils";

export interface HeaderProps {
    
};

export interface HeaderState {
    twitter: string;
    facebook: string;
    phone: string;
    email: string;
    instagram: string;
    message: IStatus;
};
