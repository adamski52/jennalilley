import { AdminAuthentication } from "./Admin";
import { IModal } from "./Modal";
import { IStatus } from "../interfaces/Status";

export interface AppState {
    authentication: AdminAuthentication;
    message: IStatus;
    modal: IModal;
}