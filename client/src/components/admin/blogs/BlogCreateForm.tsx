import React, { MouseEvent } from 'react';
import BlogForm from './BlogForm';
import RefUtil from '../../../util/RefUtil';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import BlogsService from '../../../services/BlogsService';

export default class BlogCreateForm extends BlogForm {
  protected async onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let payload = {
        title: RefUtil.getValue(this.titleRef, ""),
        content: this.state.content,
        startDateTime: this.state.startDateTime,
        endDateTime: this.state.endDateTime
    };

    await BlogsService.create(this.props.setGlobalMessage, payload);
    this.setState({
        content: "",
        title: "",
        startDateTime: null,
        endDateTime: null
    });
  }

  protected renderButton() {
    return (
        <div>
          <NevermindButton authentication={this.props.authentication} />
          <SaveButton onClick={this.onSubmit} authentication={this.props.authentication} />
        </div>
    );
  }
}
