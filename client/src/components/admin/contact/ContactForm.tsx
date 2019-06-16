import React, { FormEvent } from 'react';
import ReactQuill from 'react-quill';
import {style} from "typestyle";
import { ContactFormProps, ContactFormState } from '../../states/Contact';
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';
import RefUtil from '../../../util/RefUtil';
import { RTF_MODULES } from '../../../util/EditorUtils';

export default class ContactForm extends React.Component<ContactFormProps, ContactFormState> {
  private serviceUrl = "/api/contact";

  private twitterRef = React.createRef<HTMLInputElement>();
  private facebookRef = React.createRef<HTMLInputElement>();
  private phoneRef = React.createRef<HTMLInputElement>();
  private emailRef = React.createRef<HTMLInputElement>();
  private instagramRef = React.createRef<HTMLInputElement>();

  protected quillClassName = style({
    $nest: {
      ".ql-editor": {
        "height": "400px"
      }
    }
  });

  constructor(props:any) {
    super(props);

    this.state = {
        content: "",
        twitter: "",
        facebook: "",
        phone: "",
        email: "",
        instagram: "",
        message: {
            message: "",
            type: ""
        }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    HttpService.get(this.serviceUrl).then((json) => {
      this.setState({
          content: json[0].content || "",
          twitter: json[0].twitter || null,
          facebook: json[0].facebook || null,
          phone: json[0].phone || null,
          email: json[0].email || null,
          instagram: json[0].instagram || null
      });
    }).catch(() => {
      this.setState({
        message: {
          type: STATUS.ERROR,
          message: "Failed to fetch contact info."
        }
      });
    });
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

    return HttpService.post(this.serviceUrl, payload).then(() => {
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
            <form onSubmit={this.onSubmit} className={this.quillClassName}>
                <label>
                    <span>Twitter Handle (including @)</span>
                    <input defaultValue={this.state.twitter} type="text" ref={this.twitterRef} placeholder="Twitter Handle (including @)" />
                </label>

                <label>
                    <span>Facebook URL</span>
                    <input defaultValue={this.state.facebook} type="text" ref={this.facebookRef} placeholder="Facebook URL" />
                </label>

                <label>
                    <span>Instagram URL</span>
                    <input defaultValue={this.state.instagram} type="text" ref={this.instagramRef} placeholder="Instagram URL" />
                </label>

                <label>
                    <span>Phone Number</span>
                    <input defaultValue={this.state.phone} type="text" ref={this.phoneRef} placeholder="Phone Number" />
                </label>

                <label>
                    <span>Email Address</span>
                    <input defaultValue={this.state.email} type="text" ref={this.emailRef} placeholder="Email Address" />
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
