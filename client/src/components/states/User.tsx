import { IStatus } from "../../util/TypeUtils";
import { IUser } from "../../../../server/src/models/User";
import { AdminViewProps } from "./Admin";

export interface UserViewAllState {
    items: IUser[];
    message: IStatus;
};

export interface UserViewAllProps extends AdminViewProps {
    
};
