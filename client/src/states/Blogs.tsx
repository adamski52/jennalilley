import { AdminViewProps } from "./Admin";
import { IBlog } from "../interfaces/Blog";
import { BasePageProps } from "./BasePage";

export interface BlogFormState {
    content: string;
    title: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
};

export interface BlogViewAllState {
    items: IBlog[];
};

export interface BlogViewOneState {
    item?: IBlog;
};

export interface BlogFormProps extends AdminViewProps, BasePageProps {
    match?: any;
    id: string;
};

export interface BlogViewOneProps extends AdminViewProps, BasePageProps {
    id?: string;
}

export interface BlogViewAllProps extends AdminViewProps, BasePageProps {

}
