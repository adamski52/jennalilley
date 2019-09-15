import { MouseEvent } from 'react';
import { BaseButtonProps } from '../../states/Button';
import AuthenticatedButton from './AuthenticatedButton';

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
            className: props.className || "icon-unlock-alt"
        };
    }
}
