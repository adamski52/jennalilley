import React from "react";

export default class Header extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <a href="http://localhost:8080/api/auth/facebook/start">Login with Facebook</a>
                <a href="http://localhost:8080/api/auth/google/start">Login with Google</a>
            </div>
        );
    }
}
