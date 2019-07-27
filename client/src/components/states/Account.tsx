import { AdminViewProps, AdminViewState } from "./Admin";
import { ISchedule } from "../../interfaces/Schedule";

export interface AccountViewProps extends AdminViewProps {

};

export interface AccountViewState extends AdminViewState {
  events: ISchedule[];
  modal?: {
        title: string;
        message: string;
    };
};