import React from "react";
import HttpService from "../services/HttpService";
import { LoginProps, LoginState } from "../states/Login";
import LogoutButton from "./buttons/LogoutButton";
import GoogleLoginButton from "./buttons/GoogleLoginButton";
import FacebookLoginButton from "./buttons/FacebookLoginButton";
import AccountButton from "./buttons/AccountButton";
import AdminButton from "./buttons/AdminButton";

export default class LoginBar extends React.Component<LoginProps, LoginState> {
    constructor(props:LoginProps) {
        super(props);

        this.state = {
            authentication: props.authentication
        };
    }

    public componentDidMount() {
        this.onFetch();
    }

    private async onFetch() {
        HttpService.get("/api/whoami").then((response) => {
            let isAdmin = response.roles.find((role:any) => {
                return role.name.toUpperCase() === "ADMIN";
            });

            this.setState({
                authentication: {
                    isAdmin: isAdmin,
                    isAuthenticated: true
                }
            });
        }).catch(() => {
            this.setState({
                authentication: {
                    isAdmin: false,
                    isAuthenticated: false
                }
            });
        });
    }

    public render() {
        return (
            <div>
                <AdminButton authentication={this.state.authentication} />
                <AccountButton authentication={this.state.authentication} />
                <FacebookLoginButton authentication={this.state.authentication} />
                <GoogleLoginButton authentication={this.state.authentication} />
                <LogoutButton authentication={this.state.authentication} />
            </div>
        );
    }
}
