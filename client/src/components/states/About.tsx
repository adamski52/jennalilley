import { IAbout } from "../../../../server/src/models/About";
import { IStatus } from "../../util/TypeUtils";

export interface AboutFormProps {

};

export interface AboutViewProps {
    id: string;
};

export interface AboutFormState {
    content: string;
    message: IStatus;
};

export interface AboutViewState {
  item?: IAbout;
  message: IStatus;
};