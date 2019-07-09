import { IStatus } from "../../util/TypeUtils";
import { AdminViewState, AdminViewProps } from "./Admin";
import { IContact } from "../../interfaces/Contact";

export interface ContactFormProps extends AdminViewProps {

};

export interface ContactViewProps {

};

export interface ContactFormState extends AdminViewState {
  content: string;
  twitter: string;
  facebook: string;
  phone: string;
  email: string;
  instagram: string;
  message: IStatus;
};

export interface ContactViewState {
  item?: IContact;
  message: IStatus;
};

export interface EmailFormState {
  message: IStatus;
};
