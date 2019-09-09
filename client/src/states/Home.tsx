import { IHome } from "../interfaces/Home";
import { AdminViewProps } from "./Admin";
import { BasePageProps } from "./BasePage";

export interface HomeFormProps extends AdminViewProps, BasePageProps {

};

export interface HomeViewProps extends AdminViewProps, BasePageProps {

};

export interface HomeFormState {
    content: string;
};

export interface HomeViewState {
  item?: IHome;
};