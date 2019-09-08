import React from "react";

export default abstract class BaseSecurePage<P, S> extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            isAuthenticated: !!props.isAuthenticated,
            isAdmin: !!props.isAdmin
        };
    }

    public componentWillReceiveProps(props:any) {
        this.setState({
            isAuthenticated: !!props.isAuthenticated,
            isAdmin: !!props.isAdmin
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
                {this.state.isAuthenticated === true && this.renderAuthenticatedView()}
                {this.state.isAuthenticated !== true && this.renderUnauthenticatedView()}
            </div>
        );
    }
}
