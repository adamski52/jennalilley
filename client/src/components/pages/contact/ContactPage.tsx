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

    private renderItem() {
        if(!this.state.item) {
            return null;
        }

        return (
            <div>
                <div className="col-12" dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
                {this.drawEmailForm()}
            </div>
        );
    }

    public render() {
        return (
            <div className="main-content">
                <StatusBar {...this.state.message} />
                <h2>Contact Me</h2>                
                {this.renderItem()}
            </div>
        );
    }
}
