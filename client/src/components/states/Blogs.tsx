import { TMode, IStatus } from "../../util/TypeUtils";
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
    mode: TMode;
    id: string;
};

export interface BlogViewOneProps {
    id: string;
}

export interface BlogViewAllProps {

}
