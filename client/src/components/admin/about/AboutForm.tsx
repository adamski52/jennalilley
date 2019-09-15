import React, { MouseEvent } from 'react';
import { AboutFormProps, AboutFormState } from '../../../states/About';
import AboutService from '../../../services/AboutService';
import BaseAdminPage from '../BaseAdminPage';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import RichInputText from "../../form/RichTextInput";

export default class AboutForm extends BaseAdminPage<AboutFormProps, AboutFormState> {
  constructor(props: AboutFormProps) {
    super(props);

    this.state = {
      ...this.state,
      content: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private async onFetch() {
    try {
      let json = await AboutService.readAll(this.props.setGlobalMessage);
      this.setState({
        content: json[0].content
      });
    }
    catch(e) {
      this.setState({
        content: []
      });
    }
  }

  private async onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      await AboutService.update(this.props.setGlobalMessage, {
        content: this.state.content
      });
    }
    catch(e) {}
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
