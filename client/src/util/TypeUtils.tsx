export const MODE = {
    EDIT: "edit",
    CREATE: "CREATE"
};

export type TMode = "edit" | "create";

export interface IStatus {
    message: string;
    type: string;
};
