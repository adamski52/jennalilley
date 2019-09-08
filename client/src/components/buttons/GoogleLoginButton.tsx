import { MouseEvent } from 'react';
import BaseAuthenticatedButton from './BaseAuthenticatedButton';
import { BaseButtonProps } from '../states/Button';

export default class GoogleLoginButton extends BaseAuthenticatedButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/google/start";
            }),
            label: props.label || "Login with Google",
            className: props.className || "btn btn-google icon-google",
            authentication: props.authentication
        });
    }

    public render() {
        if(!this.props.authentication || !this.props.authentication.isAuthenticated) {
            return super.render();
        }

        return null;
    }
}
