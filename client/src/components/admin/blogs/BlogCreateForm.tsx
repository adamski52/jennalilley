import React, { MouseEvent } from 'react';
import BlogForm from './BlogForm';
import RefUtil from '../../../util/RefUtil';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';

export default class BlogCreateForm extends BlogForm {
  protected onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let payload = {
        title: RefUtil.getValue(this.titleRef, ""),
        content: this.state.content,
        startDateTime: this.state.startDateTime,
        endDateTime: this.state.endDateTime
    };

    HttpService.post("/api/blogs", payload).then(() => {
        this.setState({
            content: "",
            title: "",
            startDateTime: null,
            endDateTime: null
        });

        this.props.setGlobalMessage(STATUS.SUCCESS, "Blog created successfully.");
    }).catch(() => {
        this.props.setGlobalMessage(STATUS.ERROR, "Failed to create blog.");
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
