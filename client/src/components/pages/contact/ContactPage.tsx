import React from "react";
import HttpService from "../../../util/HttpService";
import StatusBar, { STATUS } from "../../StatusBar";
import { ContactViewProps, ContactViewState } from "../../states/Contact";

export default class ContactPage extends React.Component<ContactViewProps, ContactViewState> {
    constructor(props:any) {
        super(props);

        this.state = {
            item: undefined,
            message: {
                message: "",
                type: ""
            }
        };

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

    private renderItem() {
        if(!this.state.item) {
            return null;
        }

        return (
            <div>
                <div>{this.state.item.twitter}</div>
                <div>{this.state.item.facebook}</div>
                <div>{this.state.item.instagram}</div>
                <div>{this.state.item.email}</div>
                <div>{this.state.item.phone}</div>
                <div dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
            </div>
        );
    }

    public render() {
        return (
            <div>
                <StatusBar {...this.state.message} />
                {this.renderItem()}
            </div>
        );
    }
}
