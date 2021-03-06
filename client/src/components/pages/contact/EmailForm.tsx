import React, { RefObject, FormEvent } from "react";
import HttpService from "../../../util/HttpService";
import StatusBar, { STATUS } from "../../StatusBar";
import { EmailFormState } from "../../states/Contact";

export default class EmailForm extends React.Component<any, EmailFormState> {
    private nameRef:RefObject<HTMLInputElement> = React.createRef();
    private emailRef:RefObject<HTMLInputElement> = React.createRef();
    private messageRef:RefObject<HTMLTextAreaElement> = React.createRef();

    constructor(props:any) {
        super(props);

        this.state = {
            message: {
                message: "",
                type: ""
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    private onSubmit(e:FormEvent) {
        e.preventDefault();

        if(!this.nameRef.current || !this.nameRef.current.value) {
            this.setState({
                message: {
                    message: "Pleasde provide your name.",
                    type: STATUS.ERROR
                }
            });
            return;
        }

        if(!this.emailRef.current || !this.emailRef.current.value) {
            this.setState({
                message: {
                    message: "Please provide your email address.",
                    type: STATUS.ERROR
                }
            });
            return;
        }
        
        if(this.emailRef.current.value.indexOf("@") < 0 || this.emailRef.current.value.indexOf(".") < 0) {
            this.setState({
                message: {
                    message: "Please provide a valid email address.",
                    type: STATUS.ERROR
                }
            });
            return;
        }
        
        if(!this.messageRef.current || !this.messageRef.current.value) {
            this.setState({
                message: {
                    message: "Please provide your message.",
                    type: STATUS.ERROR
                }
            });
            return;
        }

        HttpService.post("/api/email", {
            name: this.nameRef.current.value,
            email: this.emailRef.current.value,
            message: this.messageRef.current.value
        }).then(() => {
            this.setState({
                message: {
                    message: "Message sent",
                    type: STATUS.SUCCESS
                }
            });
        }).catch(() => {
            this.setState({
                message: {
                    message: "Failed to send email.  Please try again.",
                    type: STATUS.ERROR
                }
            });
        })
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <StatusBar message={this.state.message.message} type={this.state.message.type} />

                <label className="form-group col-12">
                    <span>Your Name</span>
                    <input className="form-control" type="text" ref={this.nameRef} />
                </label>

                <label className="form-group col-12">
                    <span>Your Email Address</span>
                    <input className="form-control" type="text" ref={this.emailRef} />
                </label>

                <label className="form-group col-12">
                    <span>Your Message</span>
                    <textarea className="form-control" ref={this.messageRef} />
                </label>

                <div className="col-12 admin-buttons text-right">
                    <button className="btn btn-email icon-envelope" onClick={this.onSubmit}>Send Email</button>
                </div>
            </form>
        );
    }
}
