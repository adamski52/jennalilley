import React from "react";
import { LoginProps, LoginState } from "../states/Login";
import LogoutButton from "./buttons/LogoutButton";
import GoogleLoginButton from "./buttons/GoogleLoginButton";
import FacebookLoginButton from "./buttons/FacebookLoginButton";
import AccountButton from "./buttons/AccountButton";
import AdminAreaButton from "./buttons/AdminAreaButton";

export default class LoginBar extends React.Component<LoginProps, LoginState> {
    constructor(props:LoginProps) {
        super(props);

        this.state = {
            authentication: props.authentication
        };
    }

    public render() {
        return (
            <div className="col-12 text-right login-bar">
                <AdminAreaButton authentication={this.state.authentication} />
                <AccountButton authentication={this.state.authentication} />
                <FacebookLoginButton authentication={this.state.authentication} />
                <GoogleLoginButton authentication={this.state.authentication} />
                <LogoutButton authentication={this.state.authentication} />
            </div>
        );
    }
}
