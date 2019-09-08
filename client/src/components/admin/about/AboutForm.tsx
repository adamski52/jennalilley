import React, { MouseEvent } from 'react';
import { AboutFormProps, AboutFormState } from '../../states/About';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import BaseAdminPage from '../BaseAdminPage';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import RichInputText from "../../form/RichTextInput";

export default class AboutForm extends BaseAdminPage<AboutFormProps, AboutFormState> {
  constructor(props: AboutFormProps) {
    super(props);

    this.state = {
      authentication: props.authentication,
      content: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/about").then((json) => {
      this.setState({
        content: json[0].content
      });
    }).catch(() => {
      this.props.setGlobalMessage(STATUS.ERROR, "Failed to fetch content.");
    });
  }

  private onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let payload = {
      content: this.state.content
    };

    HttpService.post("/api/about", payload).then(() => {
      this.props.setGlobalMessage(STATUS.SUCCESS, "About section updated.");
    }).catch(() => {
      this.props.setGlobalMessage(STATUS.ERROR, "Failed to sav e content.");
    });
  }

  public render() {
    return (
      <div>
        <h2>About Page</h2>
        <form>
          <RichInputText content={this.state.content} onChange={(data:string) => {
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
