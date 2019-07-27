import { IStatus } from "../../util/TypeUtils";
import { IHome } from "../../interfaces/Home";
import { AdminViewProps } from "./Admin";

export interface HomeFormProps extends AdminViewProps {

};

export interface HomeViewProps {

};

export interface HomeFormState {
    content: string;
    message: IStatus;
};

export interface HomeViewState {
  item?: IHome;
  message: IStatus;
};