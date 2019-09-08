import React, { RefObject, FormEvent } from "react";
import HttpService from "../../../util/HttpService";
import { STATUS } from "../../StatusBar";
import { EmailFormState } from "../../states/Contact";
import SendEmailButton from "../../buttons/SendEmailButton";

export default class EmailForm extends React.Component<any, EmailFormState> {
    private nameRef:RefObject<HTMLInputElement> = React.createRef();
    private emailRef:RefObject<HTMLInputElement> = React.createRef();
    private messageRef:RefObject<HTMLTextAreaElement> = React.createRef();

    constructor(props:any) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    private onSubmit(e:FormEvent) {
        e.preventDefault();

        if(!this.nameRef.current || !this.nameRef.current.value) {
            this.props.setGlobalMessage(STATUS.ERROR, "Please provide your name.");
            return;
        }

        if(!this.emailRef.current || !this.emailRef.current.value) {
            this.props.setGlobalMessage(STATUS.ERROR, "Please provide your email address.");
            return;
        }
        
        if(this.emailRef.current.value.indexOf("@") < 0 || this.emailRef.current.value.indexOf(".") < 0) {
            this.props.setGlobalMessage(STATUS.ERROR, "Please provide a valid email address.");
            return;
        }
        
        if(!this.messageRef.current || !this.messageRef.current.value) {
            this.props.setGlobalMessage(STATUS.ERROR, "Please provide your message.");
            return;
        }

        HttpService.post("/api/email", {
            name: this.nameRef.current.value,
            email: this.emailRef.current.value,
            message: this.messageRef.current.value
        }).then(() => {
            this.props.setGlobalMessage(STATUS.SUCCESS, "Message sent.");
        }).catch(() => {
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to send email.  Please try again.");
        });
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
