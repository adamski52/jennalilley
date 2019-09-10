import { MouseEvent } from "react";
import { AdminAuthentication } from "./Admin";

export interface BaseButtonProps {
    onClick?: (e:MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    label?: string;
    authentication?: AdminAuthentication;
};

export interface BaseButtonState {
    onClick: (e:MouseEvent<HTMLButtonElement>) => void;
    className: string;
    label: string;
    authentication: AdminAuthentication;
}

export interface BaseLinkProps {
    to?: string;
    className?: string;
    label?: string;
    authentication?: AdminAuthentication;
};

export interface BaseLinkState {
    to: string;
    className: string;
    label: string;
    authentication: AdminAuthentication;
}