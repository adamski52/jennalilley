import { AdminAuthentication } from "./Admin";
import { RouteProps } from "react-router";

export interface PageContainerBaseProps extends RouteProps {
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

export interface AdminPageContainerBaseProps extends SecurePageContainerBaseProps {

}

export interface AdminPageContainerBaseState extends SecurePageContainerBaseState {

}