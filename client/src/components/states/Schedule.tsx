import { ISchedule } from "../../../../server/src/models/Schedule";
import { IStatus } from "../../util/TypeUtils";
import { AdminViewState, AdminViewProps } from "./Admin";

export interface ScheduleFormState extends AdminViewState  {
    name: string;
    type: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    capacity: string;
    ageRestrictions: string;
    cost: string;
    location: string;
    description: string;
    message: IStatus;
};

export interface ScheduleViewAllState extends AdminViewState {
    items: ISchedule[];
    message: IStatus;
};

export interface ScheduleViewOneState extends AdminViewState  {
    name: string;
    type: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    capacity: string;
    ageRestrictions: string;
    cost: string;
    location: string;
    description: string;
    message: IStatus;
};

export interface ScheduleFormProps extends AdminViewProps {
    match?: any;
    id: string;
};

export interface ScheduleViewOneProps extends AdminViewProps {
    id?: string;
    match?: any;
}

export interface ScheduleViewAllProps extends AdminViewProps {

}
