import { IStatus } from "../../util/TypeUtils";
import { AdminViewProps } from "./Admin";
import { IAbout } from "../../interfaces/About";

export interface AboutFormProps extends AdminViewProps {

};

export interface AboutViewProps {

};

export interface AboutFormState {
    content: string;
    message: IStatus;
};

export interface AboutViewState {
  item?: IAbout;
  message: IStatus;
};