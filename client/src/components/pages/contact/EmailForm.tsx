import React, { RefObject, FormEvent } from "react";
import { EmailFormState } from "../../../states/Contact";
import SendEmailButton from "../../buttons/SendEmailButton";
import ContactService from "../../../services/ContactService";

export default class EmailForm extends React.Component<any, EmailFormState> {
    private nameRef:RefObject<HTMLInputElement> = React.createRef();
    private emailRef:RefObject<HTMLInputElement> = React.createRef();
    private messageRef:RefObject<HTMLTextAreaElement> = React.createRef();

    constructor(props:any) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    private async onSubmit(e:FormEvent) {
        e.preventDefault();

        let payload = {
            name: this.nameRef,
            email: this.emailRef,
            message: this.messageRef
        };

        await ContactService.sendEmail(this.props.setGlobalMessage, payload);
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <span>Your Name</span>
                <input type="text" ref={this.nameRef} />

                <span>Your Email Address</span>
                <input type="text" ref={this.emailRef} />

                <span>Your Message</span>
                <textarea ref={this.messageRef} />

                <SendEmailButton onClick={this.onSubmit} />
            </form>
        );
    }
}
