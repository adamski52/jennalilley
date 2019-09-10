import { MouseEvent } from 'react';
import AuthenticatedButton from './AuthenticatedButton';
import { BaseButtonProps } from '../../states/Button';

export default class LogoutButton extends AuthenticatedButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/logout";
            }),
            label: props.label || "Logout",
            className: "btn btn-logout icon-unlock-alt"
        };
    }
}
