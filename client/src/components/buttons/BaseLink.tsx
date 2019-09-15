import React from 'react';
import { BaseLinkProps, BaseLinkState } from '../../states/Button';
import { Link } from 'react-router-dom';

export default abstract class BaseLink extends React.Component<BaseLinkProps, BaseLinkState> {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
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
