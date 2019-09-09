import React from 'react';
import { BaseLinkProps, BaseLinkState } from '../../states/Button';
import { Link } from 'react-router-dom';

export default abstract class BaseLink extends React.Component<BaseLinkProps, BaseLinkState> {
    public render():JSX.Element | null {
        return (
            <Link to={this.props.to || ""} className={this.props.className}>{this.props.label}</Link>
        );
    }
}
