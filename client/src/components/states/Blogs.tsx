import { IStatus } from "../../util/TypeUtils";
import { IBlog } from "../../../../server/src/models/Blog";

export interface BlogFormState {
    content: string;
    title: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    message: IStatus;
};

export interface BlogViewAllState {
    items: IBlog[];
    message: IStatus;
};

export interface BlogViewOneState {
    item?: IBlog;
    message: IStatus;
};

export interface BlogFormProps {
    match?: any;
    id: string;
};

export interface BlogViewOneProps {
    id: string;
}

export interface BlogViewAllProps {

}
