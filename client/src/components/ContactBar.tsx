import React from "react";
import HttpService from "../util/HttpService";
import { ContactViewProps, ContactViewState } from "./states/Contact";

export default class ContactBar extends React.Component<ContactViewProps, ContactViewState> {
    constructor(props:any) {
        super(props);

        this.state = {
            item: undefined,
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
            this.setState({
                item: json[0]
            });
        }).catch((e) => {
            
        });
    }

    private renderSocialButton(iconClass:string, url:string, linkText: string) {
        if(!url) {
            return (
                <span className={iconClass}>{linkText}</span>
            );
        }
        
        return (
            <a href={url} className={iconClass}>{linkText}</a>
        );
    }

    public render() {
        if(!this.state.item) {
            return null;
        }

        return (
            <div>
                {this.renderSocialButton("btn btn-twitter icon-twitter", this.state.item.twitter, "Follow me on Twitter")}
                {this.renderSocialButton("btn btn-facebook icon-facebook", this.state.item.facebook, "Follow me on Facebook")}
                {this.renderSocialButton("btn btn-instagram icon-instagram", this.state.item.instagram, "Follow me on Instagram")}
                {this.renderSocialButton("btn btn-phone icon-phone", "", this.state.item.phone)}
            </div>
        );
    }
}
