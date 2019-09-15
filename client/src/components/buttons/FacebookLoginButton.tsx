import { MouseEvent } from 'react';
import { BaseButtonProps } from '../../states/Button';
import BaseButton from './BaseButton';

export default class FacebookLoginButton extends BaseButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/facebook/start";
            }),
            label: props.label || "Login with Facebook",
            className: props.className || "btn-facebook icon-facebook"
        };
    }

    public render() {
        if(!this.state.authentication || !this.state.authentication.isAuthenticated) {
            return super.render();
        }

        return null;
    }
}
