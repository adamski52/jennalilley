import {MouseEvent} from 'react';
import Button from "./Button";
import { BaseButtonProps } from '../../states/Button';

export default abstract class AuthenticatedButton extends Button {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {}),
            className: props.className || "",
            label: props.label || "",
            authentication: props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        };
    }

    public componentWillReceiveProps(props:BaseButtonProps) {
        this.setState({
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {}),
            className: props.className || "",
            label: props.label || "",
            authentication: props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        });
    }

    public render() {
        if(!this.state.authentication || !this.state.authentication.isAuthenticated) {
            return null;
        }

        return super.render();
    }
}
