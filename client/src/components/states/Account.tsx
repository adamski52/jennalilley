import { AdminViewProps, AdminViewState } from "./Admin";
import { ISchedule } from "../../interfaces/Schedule";
import { BasePageProps } from "./BasePage";

export interface AccountViewProps extends AdminViewProps, BasePageProps {

};

export interface AccountViewState extends AdminViewState {
  events: ISchedule[];
  modal?: {
        title: string;
        message: string;
    };
};