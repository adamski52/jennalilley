import { IBase } from "./Base";

export interface ISchedule extends IBase {
    name: string,
    type: string,
    startDateTime: Date | null,
    endDateTime: Date | null,
    capacity: string,
    ageRestrictions: string,
    cost: string,
    isFull: boolean;
    location: string,
    description: string
};
