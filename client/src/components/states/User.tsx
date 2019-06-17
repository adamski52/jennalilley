import { IStatus } from "../../util/TypeUtils";
import { IUser } from "../../../../server/src/models/User";

export interface UserViewAllState {
    items: IUser[];
    message: IStatus;
};

export interface UserViewAllProps {
    
};
