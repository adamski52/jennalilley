import { IContact } from "../../../../server/src/models/Contact";
import { IStatus } from "../../util/TypeUtils";

export interface ContactFormProps {

};

export interface ContactViewProps {
    id: string;
};

export interface ContactFormState {
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