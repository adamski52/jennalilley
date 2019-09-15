import React, {MouseEvent} from 'react';
import { BaseButtonProps, BaseButtonState } from '../../states/Button';
import BaseReactiveElement from '../BaseReactiveElement';

export default abstract class BaseButton extends BaseReactiveElement<BaseButtonProps, BaseButtonState> {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            onClick: this.props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {}),
            className: this.props.className || "",
            label: this.props.label || "",
            authentication: this.props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        };
    }
   
    public render():JSX.Element | null {
        return (
            <button onClick={this.state.onClick} className={"btn btn-secondary " + this.state.className}>{this.state.label}</button>
        );
    }
}
