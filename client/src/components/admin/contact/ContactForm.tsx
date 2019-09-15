import React, { MouseEvent } from 'react';
import { ContactFormProps, ContactFormState } from '../../../states/Contact';
import RefUtil from '../../../util/RefUtil';
import BaseAdminPage from '../BaseAdminPage';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import TextInput from '../../form/TextInput';
import RichTextInput from '../../form/RichTextInput';
import ContactService from '../../../services/ContactService';

export default class ContactForm extends BaseAdminPage<ContactFormProps, ContactFormState> {
  private twitterRef = React.createRef<HTMLInputElement>();
  private facebookRef = React.createRef<HTMLInputElement>();
  private phoneRef = React.createRef<HTMLInputElement>();
  private emailRef = React.createRef<HTMLInputElement>();
  private instagramRef = React.createRef<HTMLInputElement>();

  constructor(props:ContactFormProps) {
    super(props);

    this.state = {
        ...this.state,
        content: "",
        twitter: "",
        facebook: "",
        phone: "",
        email: "",
        instagram: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private async onFetch() {
    try {
      let json = await ContactService.readAll(this.props.setGlobalMessage);
      this.setState({
          content: json[0].content || "",
          twitter: json[0].twitter || null,
          facebook: json[0].facebook || null,
          phone: json[0].phone || null,
          email: json[0].email || null,
          instagram: json[0].instagram || null
      });
    } catch(e) {}
  }

  private onChange(value:string) {
    this.setState({
        content: value
    });
  }

  private async onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await ContactService.update(this.props.setGlobalMessage, {
          twitter: RefUtil.getValue(this.twitterRef, ""),
          facebook: RefUtil.getValue(this.facebookRef, ""),
          email: RefUtil.getValue(this.emailRef, ""),
          phone: RefUtil.getValue(this.phoneRef, ""),
          instagram: RefUtil.getValue(this.instagramRef, ""),
          content: this.state.content
      });
    } catch(e) {}
  }

  protected renderAuthenticatedView() {
    return (
        <div>
            <h2>Contact Page</h2>

            <div>
                <h5>Hey.  Read this.</h5>
                <p>Filling stuff in here will place publically accessible links to whatever you fill in on the header/footer of every page.  <strong>This means, for instance, that your phone number will be visible to everyone in the world</strong>.</p>
                <p>To remove those links, remove the values from the corresponding box below.</p>
                <p>Your email address will be used for receiving emails sent from the form.  There will never be a direct link to your email address on the page.  If you have a blank email address, the email form will not display.</p>
            </div>

            <form>
                <TextInput defaultValue={this.state.twitter} reference={this.twitterRef} title="Twitter Feed URL" />
                <TextInput defaultValue={this.state.facebook} reference={this.twitterRef} title="Facebook URL" />
                <TextInput defaultValue={this.state.instagram} reference={this.twitterRef} title="Instagram URL" />
                <TextInput defaultValue={this.state.phone} reference={this.twitterRef} title="Phone Number" />
                <TextInput defaultValue={this.state.email} reference={this.twitterRef} title="Email Address" />
                <RichTextInput content={this.state.content} onChange={(data:string) => {
                    this.setState({
                        content: data
                    });
                }} />
                <NevermindButton authentication={this.props.authentication} />
                <SaveButton onClick={this.onSubmit} authentication={this.props.authentication} />
            </form>
        </div>
    );
  }
}
