import { IStatus } from "../../util/TypeUtils";
import { AdminViewProps } from "./Admin";
import { IUser } from "../../interfaces/User";

export interface UserViewAllState {
    items: IUser[];
    message: IStatus;
};

export interface UserViewAllProps extends AdminViewProps {
    
};
