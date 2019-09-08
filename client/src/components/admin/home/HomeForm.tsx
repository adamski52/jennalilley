import React, { MouseEvent } from 'react';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import BaseAdminPage from '../BaseAdminPage';
import { HomeFormProps, HomeFormState } from '../../states/Home';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import RichTextInput from '../../form/RichTextInput';

export default class HomeForm extends BaseAdminPage<HomeFormProps, HomeFormState> {
  constructor(props: HomeFormProps) {
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
    HttpService.get("/api/home").then((json) => {
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

    HttpService.post("/api/home", payload).then(() => {
      this.props.setGlobalMessage(STATUS.SUCCESS, "Home section updated successfully.");
    }).catch(() => {
      this.props.setGlobalMessage(STATUS.ERROR, "Failed to save content.");
    });
  }

  public render() {
    return (
      <div>
        <h2>Home Page</h2>
        <form>
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
