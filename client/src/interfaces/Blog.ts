import { IBase } from "./Base";

export interface IBlog extends IBase {
    title: string;
    content: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
};
