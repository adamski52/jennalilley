import React, { MouseEvent } from 'react';
import HomeService from '../../../services/HomeService';
import BaseAdminPage from '../BaseAdminPage';
import { HomeFormProps, HomeFormState } from '../../../states/Home';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import RichTextInput from '../../form/RichTextInput';

export default class HomeForm extends BaseAdminPage<HomeFormProps, HomeFormState> {
  constructor(props: HomeFormProps) {
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
      let json = await HomeService.readAll(this.props.setGlobalMessage);
      this.setState({
        content: json[0].content
      });
    } catch(e) {
      this.setState({
        content: ""
      });
    }
  }

  private async onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await HomeService.update(this.props.setGlobalMessage, {
        content: this.state.content
      });
    }
    catch(e) {}
  }

  protected renderAuthenticatedView() {
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
