import React from "react";

export default abstract class BaseAdminPage<P, S> extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            authentication: props.authentication
        };
    }

    public componentWillReceiveProps(props:any) {
        this.setState({
            authentication: props.authentication
        });
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
