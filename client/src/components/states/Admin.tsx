import { IStatus } from "../../util/TypeUtils";

export interface AdminAuthentication {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export interface AdminViewState extends AdminAuthentication {
    message: IStatus;
};

export interface AdminViewProps extends AdminAuthentication{
    
};
