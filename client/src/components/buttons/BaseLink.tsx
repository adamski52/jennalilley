import React from 'react';
import { BaseLinkProps, BaseLinkState } from '../../states/Button';
import { Link } from 'react-router-dom';
import BaseReactiveElement from '../BaseReactiveElement';

export default abstract class BaseLink extends BaseReactiveElement<BaseLinkProps, BaseLinkState> {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: this.props.to || "",
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
            <Link to={this.state.to} className={"btn btn-secondary " + this.state.className}>{this.state.label}</Link>
        );
    }
}
