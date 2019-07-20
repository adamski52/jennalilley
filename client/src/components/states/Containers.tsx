import { AdminAuthentication } from "./Admin";

export interface PageContainerBaseProps {
    fetch?: () => void;
}

export interface PageContainerBaseState {

}

export interface SecurePageContainerBaseProps extends PageContainerBaseProps {
    authentication: AdminAuthentication;
}

export interface SecurePageContainerBaseState extends PageContainerBaseState {
    authentication: AdminAuthentication;
}