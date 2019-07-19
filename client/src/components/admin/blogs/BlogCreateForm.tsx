import React, { FormEvent } from 'react';
import BlogForm from './BlogForm';
import RefUtil from '../../../util/RefUtil';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import { Link } from "react-router-dom";

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
        <div className="row admin-buttons">
            <div className="col-6">
                <Link to="/admin" className="btn btn-admin icon-undo">Nevermind</Link>
            </div>
            <div className="col-6 text-right">
                <button className="btn btn-admin icon-floppy-o">Create Blog</button>
            </div>
        </div>
    );
  }
}
