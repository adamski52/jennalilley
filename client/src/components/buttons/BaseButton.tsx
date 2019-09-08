import React from 'react';
import { BaseButtonProps, BaseButtonState } from '../states/Button';

export default abstract class BaseButton extends React.Component<BaseButtonProps, BaseButtonState> {
    public render():JSX.Element | null {
        return (
            <button onClick={this.props.onClick} className={this.props.className}>{this.props.label}</button>
        );
    }
}
