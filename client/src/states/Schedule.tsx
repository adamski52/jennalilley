import { AdminViewState, AdminViewProps } from "./Admin";
import { ISchedule } from "../interfaces/Schedule";
import { BasePageProps } from "./BasePage";

export interface ScheduleFormState extends AdminViewState, BasePageProps {
    name: string;
    type: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    capacity: string;
    ageRestrictions: string;
    cost: string;
    location: string;
    description: string;
    isFull: boolean;
};

export interface ScheduleViewAllState extends AdminViewState {
    items: ISchedule[];
};

export interface ScheduleViewOneState extends AdminViewState  {
    name: string;
    type: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    capacity: string;
    ageRestrictions: string;
    cost: string;
    isFull: boolean;
    location: string;
    description: string;
    modal?: {
        title: string;
        message: string;
    };
};

export interface ScheduleFormProps extends AdminViewProps, BasePageProps {
    match?: any;
    id: string;
};

export interface ScheduleViewOneProps extends AdminViewProps, BasePageProps {
    id?: string;
    match?: any;
}

export interface ScheduleViewAllProps extends AdminViewProps, BasePageProps {

}
