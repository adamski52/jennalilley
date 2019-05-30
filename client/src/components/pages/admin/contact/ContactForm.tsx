import React, { FormEvent } from 'react';
import DatePicker from "react-datepicker";
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';
import ReactQuill from 'react-quill';
import { RTF_MODULES } from '../../../../util/EditorUtils';
import RefUtil from '../../../../util/RefUtil';

export default class ContactForm extends React.Component<any, any> {
  private twitterRef = React.createRef<HTMLInputElement>();
  private facebookRef = React.createRef<HTMLInputElement>();
  private phoneRef = React.createRef<HTMLInputElement>();
  private emailRef = React.createRef<HTMLInputElement>();
  private instagramRef = React.createRef<HTMLInputElement>();

  constructor(props:any) {
    super(props);

    this.state = {
        content: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  private onChange(value:string) {
    this.setState({
        content: value
    });
  }

  private onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let payload = {
        twitter: RefUtil.getValue(this.twitterRef, ""),
        facebook: RefUtil.getValue(this.facebookRef, ""),
        email: RefUtil.getValue(this.emailRef, ""),
        phone: RefUtil.getValue(this.phoneRef, ""),
        instagram: RefUtil.getValue(this.instagramRef, ""),
        content: this.state.content
    };

    HttpService.post("/api/contact", payload).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "Contact information updated."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to save contact information."
            }
        });
    });
  }

  public render() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            <form onSubmit={this.onSubmit}>
                <label>
                    <span>Twitter Handle (including @)</span>
                    <input defaultValue="aaa" type="text" ref={this.twitterRef} placeholder="Twitter Handle (including @)" />
                </label>

                <label>
                    <span>Facebook URL</span>
                    <input defaultValue="bbb" type="text" ref={this.facebookRef} placeholder="Facebook URL" />
                </label>

                <label>
                    <span>Instagram URL</span>
                    <input defaultValue="ccc" type="text" ref={this.instagramRef} placeholder="Instagram URL" />
                </label>

                <label>
                    <span>Phone Number</span>
                    <input defaultValue="ddd" type="text" ref={this.facebookRef} placeholder="Phone Number" />
                </label>

                <label>
                    <span>Email Address</span>
                    <input defaultValue="eee" type="text" ref={this.facebookRef} placeholder="Email Address" />
                </label>

                <label>
                    <span>Content</span>
                    <ReactQuill modules={RTF_MODULES} value={this.state.content} onChange={this.onChange}/>
                </label>

                <button>Save Contact Information</button>
            </form>
        </div>
    );
  }
}
