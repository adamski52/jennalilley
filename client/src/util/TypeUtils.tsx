export const MODE = {
    EDIT: "edit",
    CREATE: "create"
};

export type TMode = "edit" | "create";

export interface IStatus {
    message: string;
    type: string;
};
