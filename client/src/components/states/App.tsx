import { AdminAuthentication } from "./Admin";
import { IStatus } from "../../util/TypeUtils";

export interface AppState {
    authentication: AdminAuthentication;
    message: IStatus;
}