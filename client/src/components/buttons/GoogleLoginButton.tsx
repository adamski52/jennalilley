import { MouseEvent } from 'react';
import { BaseButtonProps } from '../../states/Button';
import BaseButton from './BaseButton';

export default class GoogleLoginButton extends BaseButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/google/start";
            }),
            label: props.label || "Login with Google",
            className: props.className || "btn-google icon-google"
        };
    }
    
    public render() {
        if(!this.state.authentication || !this.state.authentication.isAuthenticated) {
            return super.render();
        }

        return null;
    }
}
