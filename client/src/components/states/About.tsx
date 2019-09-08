import { AdminViewProps } from "./Admin";
import { BasePageProps } from "./BasePage";

import { IAbout } from "../../interfaces/About";

export interface AboutFormProps extends AdminViewProps, BasePageProps {

};

export interface AboutViewProps extends AdminViewProps, BasePageProps {

};

export interface AboutFormState {
    content: string;
};

export interface AboutViewState {
  item?: IAbout;
};