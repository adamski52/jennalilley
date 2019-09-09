import React from "react";
import { ContactViewProps, ContactViewState } from "../../../states/Contact";
import EmailForm from "./EmailForm";
import ContactService from "../../../services/ContactService";

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

    private async onFetch() {
        let json = await ContactService.readAll(this.props.setGlobalMessage);
        this.setState({
            item: json[0]
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
