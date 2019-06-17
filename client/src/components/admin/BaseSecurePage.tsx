import React from "react";
import { AdminViewProps, AdminViewState } from "../states/Admin";
import HttpService from "../../util/HttpService";
import { STATUS } from "../StatusBar";

export default abstract class BaseSecurePage<P, S> extends React.Component<P extends AdminViewProps ? P : AdminViewProps, S extends AdminViewState ? S : AdminViewState> {
    constructor(props:any) {
        super(props);

        // this.state = {
        //     isAuthenticated: false,
        //     message: {
        //         message: "",
        //         type: ""
        //     }
        // };

        HttpService.get("/api/whoami").then((response) => {
            let isAdmin = response.roles.find((role:any) => {
                return role.name.toUpperCase() === "ADMIN";
            });

            if(isAdmin) {
                this.setState({
                    isAuthenticated: true,
                    message: {
                        message: "",
                        type: ""
                    }
                });
                return;
            }

            throw response;
        }).catch(() => {
            this.setState({
                isAuthenticated: false,
                message: {
                    message: "Access denied.",
                    type: STATUS.WARN
                }
            });
        });
    }

    protected renderUnauthenticatedView():JSX.Element | null {
        return (
            <div className="unauthenticated">
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
                {this.state.isAuthenticated === false && this.renderUnauthenticatedView()}
            </div>
        );
    }
}
