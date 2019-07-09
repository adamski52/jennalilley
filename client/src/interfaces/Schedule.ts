import { IBase } from "./Base";

export interface ISchedule extends IBase {
    name: string,
    type: string,
    startDateTime: Date | null,
    endDateTime: Date | null,
    capacity: string,
    ageRestrictions: string,
    cost: string,
    location: string,
    description: string
};
