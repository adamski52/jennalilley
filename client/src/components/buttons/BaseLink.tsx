import React from 'react';
import { BaseLinkProps, BaseLinkState } from '../../states/Button';
import { Link } from 'react-router-dom';

export default abstract class BaseLink extends React.Component<BaseLinkProps, BaseLinkState> {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            to: props.to || "",
            className: props.className || "",
            label: props.label || "",
            authentication: props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        };
    }

    public componentWillReceiveProps(props:BaseLinkProps) {
        this.setState({
            to: props.to || "",
            className: props.className || "",
            label: props.label || "",
            authentication: props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        });
    }

    public render():JSX.Element | null {
        return (
            <Link to={this.state.to} className={this.state.className}>{this.state.label}</Link>
        );
    }
}
