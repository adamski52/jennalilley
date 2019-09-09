import { AdminViewState, AdminViewProps } from "./Admin";
import { IContact } from "../interfaces/Contact";
import { BasePageProps } from "./BasePage";

export interface ContactFormProps extends AdminViewProps, BasePageProps {

};

export interface ContactViewProps extends AdminViewProps, BasePageProps {

};

export interface ContactFormState extends AdminViewState {
  content: string;
  twitter: string;
  facebook: string;
  phone: string;
  email: string;
  instagram: string;
};

export interface ContactViewState {
  item?: IContact;
};

export interface EmailFormState {
};
