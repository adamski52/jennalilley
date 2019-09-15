import React, { RefObject, FormEvent } from "react";
import { EmailFormState, EmailFormProps } from "../../../states/Contact";
import SendEmailButton from "../../buttons/SendEmailButton";
import ContactService from "../../../services/ContactService";
import TextInput from "../../form/TextInput";
import TextareaInput from "../../form/TextareaInput";

export default class EmailForm extends React.Component<EmailFormProps, EmailFormState> {
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

        try {
            await ContactService.sendEmail(this.props.setGlobalMessage, payload);
        } catch(e) {}
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <TextInput reference={this.nameRef} title="Your Name" />
                <TextInput reference={this.emailRef} title="Your Email Address" />
                <TextareaInput reference={this.messageRef} title="Your Message" />
                <div className="text-right layout-tight">
                    <SendEmailButton onClick={this.onSubmit} />
                </div>
            </form>
        );
    }
}
