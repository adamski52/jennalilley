import { MouseEvent } from 'react';
import { BaseButtonProps } from '../../states/Button';
import AuthenticatedButton from './AuthenticatedButton';

export default class FacebookLoginButton extends AuthenticatedButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                window.location.href = "/api/auth/facebook/start";
            }),
            label: props.label || "Login with Facebook",
            className: props.className || "btn btn-facebook icon-facebook"
        };
    }

    public render() {
        if(!this.props.authentication || !this.props.authentication.isAuthenticated) {
            return super.render();
        }

        return null;
    }
}
