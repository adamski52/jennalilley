import React from "react";
import HttpService from "../../../util/HttpService";
import StatusBar, { STATUS } from "../../StatusBar";
import { ContactViewProps, ContactViewState } from "../../states/Contact";
import EmailForm from "./EmailForm";

export default class ContactPage extends React.Component<ContactViewProps, ContactViewState> {
    constructor(props:ContactViewProps) {
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

    private drawEmailForm() {
        if(!this.state.item || !this.state.item.email) {
            return null;
        }
        
        return (
            <div className="col-12">
                <EmailForm />
            </div>
        );
    }

    private onFetch() {
        HttpService.get("/api/contact").then((json) => {
            this.setState({
                item: json[0]
            });
        }).catch((e) => {
            this.setState({
                message: {
                    message: "Failed to load content.",
                    type: STATUS.ERROR
                }
            });
        });
    }

    private renderSocialButton(iconClass:string, url:string, linkText: string) {
        if(!url) {
            return null;
        }
        
        return (
            <div className="col-3">
                <a href={url} className={iconClass}>{linkText}</a>
            </div>
        );
    }

    private renderItem() {
        if(!this.state.item) {
            return null;
        }

        return (
            <div className="col-12">
                {this.renderSocialButton("btn btn-twitter icon-twitter", this.state.item.twitter, "Follow me on Twitter")}
                {this.renderSocialButton("btn btn-facebook icon-facebook", this.state.item.facebook, "Follow me on Facebook")}
                {this.renderSocialButton("btn btn-instagram icon-instagram", this.state.item.instagram, "Follow me on Instagram")}
                {this.renderSocialButton("btn btn-phone icon-phone", this.state.item.phone, this.state.item.phone)}
                <div className="col-12" dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
                {this.drawEmailForm()}
            </div>
        );
    }

    public render() {
        return (
            <div className="main-content">
                <StatusBar {...this.state.message} />
                {this.renderItem()}
            </div>
        );
    }
}
