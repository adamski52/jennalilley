import React from "react";
import BaseReactiveElement from "../BaseReactiveElement";

export default abstract class BaseAdminPage<P, S> extends BaseReactiveElement<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            ...this.state,
            authentication: props.authentication
        };
    }

    protected renderUnauthenticatedView():JSX.Element | null {
        return (
            <div>
                You need to login to an admin account to access this page.
            </div>
        );
    }

    protected renderAuthenticatedView():JSX.Element | null {
        return null;
    }

    public render() {
        return (
            <div>
                {this.state.authentication.isAdmin === true && this.renderAuthenticatedView()}
                {this.state.authentication.isAdmin !== true && this.renderUnauthenticatedView()}
            </div>
        );
    }
}
