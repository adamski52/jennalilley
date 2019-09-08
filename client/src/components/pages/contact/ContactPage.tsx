import React from "react";
import HttpService from "../../../util/HttpService";
import { STATUS } from "../../StatusBar";
import { ContactViewProps, ContactViewState } from "../../states/Contact";
import EmailForm from "./EmailForm";

export default class ContactPage extends React.Component<ContactViewProps, ContactViewState> {
    constructor(props:ContactViewProps) {
        super(props);

        this.state = {
            item: undefined
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
            <EmailForm />
        );
    }

    private onFetch() {
        HttpService.get("/api/contact").then((json) => {
            this.setState({
                item: json[0]
            });
        }).catch((e) => {
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to load content.");
        });
    }

    private renderItem() {
        if(!this.state.item) {
            return null;
        }

        return (
            <div dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
        );
    }

    public render() {
        return (
            <div>
                <h2>Contact Me</h2>                
                {this.renderItem()}
                {this.drawEmailForm()}
            </div>
        );
    }
}
