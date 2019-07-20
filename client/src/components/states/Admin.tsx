import { SecurePageContainerBaseProps, SecurePageContainerBaseState } from "./Containers";

export interface AdminAuthentication {
    isAdmin: boolean;
    isAuthenticated: boolean;
}

export interface AdminPageProps extends SecurePageContainerBaseProps {

}

export interface AdminPageState extends SecurePageContainerBaseState {

}