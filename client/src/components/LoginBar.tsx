import React from "react";
import HttpService from "../util/HttpService";
import { AdminAuthentication } from "./states/Admin";
import { LoginProps } from "./states/Login";
import { Link } from "react-router-dom";

export default class LoginBar extends React.Component<LoginProps, AdminAuthentication> {
    constructor(props:LoginProps) {
        super(props);

        this.state = {
            isAuthenticated: !!props.isAuthenticated,
            isAdmin: !!props.isAdmin
        };
    }

    public componentDidMount() {
        this.onFetch();
    }

    private onFetch() {
        HttpService.get("/api/whoami").then((response) => {
            let isAdmin = response.roles.find((role:any) => {
                return role.name.toUpperCase() === "ADMIN";
            });

            this.setState({
                isAdmin: isAdmin,
                isAuthenticated: true
            });
        }).catch(() => {
            this.setState({
                isAdmin: false,
                isAuthenticated: false
            });
        });
    }

    private renderLogoutButton() {
        if(!this.state.isAuthenticated) {
            return null;
        }

        return (
            <a href="/api/auth/logout" className="btn btn-logout icon-unlock-alt">Logout</a>
        );
    }

    private renderAccountButton() {
        if(!this.state.isAuthenticated) {
            return null;
        }

        return (
            <Link className="btn btn-account icon-lock" to="/account">My Account</Link>
        );
    }

    private renderAdminButton() {
        if(!this.state.isAdmin) {
            return null;
        }

        return (
            <Link className="btn btn-admin icon-cog" to="/admin">Admin</Link>
        );
    }


    private renderLoginGoogleButton() {
        if(this.state.isAuthenticated) {
            return null;
        }

        return (
            <a className="btn btn-google icon-google" href="/api/auth/google/start">Login with Google</a>
        );
    }

    private renderLoginFacebookButton() {
        if(this.state.isAuthenticated) {
            return null;
        }

        return (
            <a className="btn btn-facebook icon-facebook" href="/api/auth/facebook/start">Login with Facebook</a>
        );
    }

    public render() {
        return (
            <div className="text-right login-bar">
                {this.renderAdminButton()}
                {this.renderAccountButton()}

                {this.renderLoginFacebookButton()}
                {this.renderLoginGoogleButton()}

                {this.renderLogoutButton()}
            </div>
        );
    }
}
