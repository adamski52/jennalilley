import React from "react";
import HttpService from "../util/HttpService";
import { HeaderState } from "./states/Header";
import { AdminViewState } from "./states/Admin";

export default class ContactBar extends React.Component<any, HeaderState & AdminViewState> {
    constructor(props:any) {
        super(props);

        this.state = {
            twitter: "",
            facebook: "",
            phone: "",
            email: "",
            instagram: "",
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
        HttpService.get("/api/contact").then((json) => {
            if(json.length <= 0) {
                return;
            }
            
            this.setState({
                twitter: json[0].twitter,
                facebook: json[0].facebook,
                phone: json[0].phone,
                email: json[0].email,
                instagram: json[0].instagram
            });
        }).catch(() => {
            
        });
    }

    private renderFacebookIcon() {
        if(!this.state.facebook) {
            return null;
        }

        return (
            <button className="icon icon-facebook" onClick={(e) => {
                window.location.href = "https://www.facebook.com/" + this.state.facebook;
            }} />
        );
    }


    private renderTwitterIcon() {
        if(!this.state.twitter) {
            return null;
        }

        return (
            <button className="icon icon-twitter" onClick={(e) => {
                window.location.href = "https://www.twitter.com/" + this.state.twitter;
            }} />
        );
    }

    private renderInstagramIcon() {
        if(!this.state.instagram) {
            return null;
        }

        return (
            <button className="icon icon-instagram" onClick={(e) => {
                window.location.href = "https://www.instagram.com/" + this.state.instagram;
            }} />
        );
    }

    private renderEmailIcon() {
        if(!this.state.email) {
            return null;
        }

        return (
            <button className="icon icon-envelope" onClick={(e) => {
                window.location.href = "mailto:" + this.state.email;
            }} />
        );
    }

    private renderPhoneNumber() {
        if(!this.state.phone) {
            return null;
        }

        return (
            <span className="icon icon-phone-square">{this.state.phone}</span>
        );
    }

    public render() {
        return (
            <div className="row contact-bar">
                {this.renderFacebookIcon()}
                {this.renderInstagramIcon()}
                {this.renderTwitterIcon()}
                {this.renderEmailIcon()}
                {this.renderPhoneNumber()}
            </div>
        );
    }
}
