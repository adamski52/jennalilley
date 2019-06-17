import { ISchedule } from "../../../../server/src/models/Schedule";
import { IStatus } from "../../util/TypeUtils";

export interface ScheduleFormState {
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

export interface ScheduleViewAllState {
    items: ISchedule[];
    message: IStatus;
};

export interface ScheduleViewOneState {
    item?: ISchedule;
    message: IStatus;
};

export interface ScheduleFormProps {
    match?: any;
    id: string;
};

export interface ScheduleViewOneProps {
    id: string;
}

export interface ScheduleViewAllProps {

}
