import { MouseEvent } from 'react';
import AuthenticatedButton from './AuthenticatedButton';
import { BaseButtonProps } from '../../states/Button';

export default class GoogleLoginButton extends AuthenticatedButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/google/start";
            }),
            label: props.label || "Login with Google",
            className: props.className || "btn btn-google icon-google"
        };
    }

    public render() {
        if(!this.props.authentication || !this.props.authentication.isAuthenticated) {
            return super.render();
        }

        return null;
    }
}
