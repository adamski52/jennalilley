import { AdminViewProps } from "./Admin";
import { IUser } from "../../interfaces/User";
import { BasePageProps } from "./BasePage";

export interface UserViewAllState {
    items: IUser[];
};

export interface UserViewAllProps extends AdminViewProps, BasePageProps {
    
};
