import React from "react";
import HttpService from "../util/HttpService";
import { HeaderState } from "./states/Header";
import { AdminViewState } from "./states/Admin";

export default class LoginBar extends React.Component<any, AdminViewState> {
    constructor(props:any) {
        super(props);

        this.state = {
            isAuthenticated: false,
            message: {
                message: "",
                type: ""
            }
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

            if(isAdmin) {
                this.setState({
                    isAuthenticated: true
                });
                return;
            }
        }).catch(() => {
            // s'ok
        });
    }

    public render() {
        if(this.state.isAuthenticated) {
            return (
                <div className="row login-bar">
                    <a href="/logout" className="btn btn-logout icon icon-unlock-alt">Logout</a>
                </div>
            );
        }

        return (
            <div className="row login-bar">
                <a className="btn btn-facebook icon icon-facebook" href="http://localhost:8080/api/auth/facebook/start">Login with Facebook</a>
                <a className="btn btn-google icon icon-google" href="http://localhost:8080/api/auth/google/start">Login with Google</a>
            </div>
        );
    }
}
