import React, { FormEvent } from 'react';
import { ContactFormProps, ContactFormState } from '../../states/Contact';
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';
import RefUtil from '../../../util/RefUtil';
import BaseSecurePage from '../BaseSecurePage';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../../../image-upload/UploadAdapter';
import { Link } from "react-router-dom";

export default class ContactForm extends BaseSecurePage<ContactFormProps, ContactFormState> {
  private serviceUrl = "/api/contact";

  private twitterRef = React.createRef<HTMLInputElement>();
  private facebookRef = React.createRef<HTMLInputElement>();
  private phoneRef = React.createRef<HTMLInputElement>();
  private emailRef = React.createRef<HTMLInputElement>();
  private instagramRef = React.createRef<HTMLInputElement>();

  constructor(props:ContactFormProps) {
    super(props);

    this.state = {
        isAuthenticated: !!props.isAuthenticated,
        isAdmin: !!props.isAdmin,
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

  protected renderAuthenticatedView() {
    return (
        <div className="main-content">
            <StatusBar {...this.state.message} />

            <h2>Contact Page</h2>

            <div className="note">
                <h5>Hey.  Read this.</h5>
                <p>Filling stuff in here will place publically accessible links to whatever you fill in on the header/footer of every page.  <strong>This means, for instance, that your phone number will be visible to everyone in the world</strong>.</p>
                <p>To remove those links, remove the values from the corresponding box below.</p>
                <p>Your email address will be used for receiving emails sent from the form.  There will never be a direct link to your email address on the page.  If you have a blank email address, the email form will not display.</p>
            </div>

            <form onSubmit={this.onSubmit}>
                <label className="form-group col-12">
                    <span>Twitter Feed URL</span>
                    <input className="form-control" defaultValue={this.state.twitter} type="text" ref={this.twitterRef} placeholder="Twitter Feed URL" />
                </label>

                <label className="form-group col-12">
                    <span>Facebook URL</span>
                    <input className="form-control" defaultValue={this.state.facebook} type="text" ref={this.facebookRef} placeholder="Facebook URL" />
                </label>

                <label className="form-group col-12">
                    <span>Instagram URL</span>
                    <input className="form-control" defaultValue={this.state.instagram} type="text" ref={this.instagramRef} placeholder="Instagram URL" />
                </label>

                <label className="form-group col-12">
                    <span>Phone Number</span>
                    <input className="form-control" defaultValue={this.state.phone} type="text" ref={this.phoneRef} placeholder="Phone Number" />
                </label>

                <label className="form-group col-12">
                    <span>Email Address</span>
                    <input className="form-control" defaultValue={this.state.email} type="text" ref={this.emailRef} placeholder="Email Address" />
                </label>

                <div className="form-group col-12">
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.content}
                        config={{
                            extraPlugins: [UploadAdapter.AttachUploadAdapterPlugin],
                            image: {
                                toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                                styles: [
                                    'full',
                                    'alignLeft',
                                    'alignRight'
                                ]
                            }
                        }}
                        onChange={(_event: any, editor: any) => {
                            this.setState({
                                content: editor.getData()
                            });
                        }}
                    />
                </div>

                <div className="row admin-buttons">
                    <div className="col-6">
                        <Link to="/admin" className="btn btn-admin icon-undo">Nevermind</Link>
                    </div>
                    <div className="col-6 text-right">
                        <button className="btn btn-admin icon-floppy-o">Update Contact Info</button>
                    </div>
                </div>
            </form>
        </div>
    );
  }
}
