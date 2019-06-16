import React, { FormEvent } from 'react';
import HttpService from '../../../../util/HttpService';
import { STATUS } from '../../../StatusBar';
import RefUtil from '../../../../util/RefUtil';
import BlogForm from './BlogForm';

export default class BlogCreateForm extends BlogForm {
  protected onSubmit(e:FormEvent<HTMLFormElement>) {
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
            endDateTime: null,
            message: {
                type: STATUS.SUCCESS,
                message: "Blog created."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to create blog."
            }
        });
    });
  }

  protected renderButton() {
    return (
        <div>
            <button>Create Blog</button>
        </div>
    );
  }
}
