import { MouseEvent } from 'react';
import BaseAuthenticatedButton from './BaseAuthenticatedButton';
import { BaseButtonProps } from '../states/Button';

export default class LogoutButton extends BaseAuthenticatedButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/logout";
            }),
            label: props.label || "Logout",
            className: "btn btn-logout icon-unlock-alt",
            authentication: props.authentication
        });
    }
}
