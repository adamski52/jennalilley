import { MouseEvent } from 'react';
import { BaseButtonProps } from '../../states/Button';
import BaseAuthenticatedButton from './BaseAuthenticatedButton';

export default class FacebookLoginButton extends BaseAuthenticatedButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/facebook/start";
            }),
            label: props.label || "Login with Facebook",
            className: props.className || "btn btn-facebook icon-facebook",
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
