import { AdminAuthentication } from "./Admin";
import { IStatus } from "../../util/TypeUtils";
import { IModal } from "./Modal";

export interface AppState {
    authentication: AdminAuthentication;
    message: IStatus;
    modal: IModal;
}