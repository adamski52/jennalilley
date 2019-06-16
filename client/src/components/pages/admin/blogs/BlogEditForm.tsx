import React, { FormEvent } from 'react';
import HttpService from '../../../../util/HttpService';
import { STATUS } from '../../../StatusBar';
import RefUtil from '../../../../util/RefUtil';
import BlogForm from './BlogForm';
import { BlogFormProps } from '../../../states/Blogs';

export default class BlogEditForm extends BlogForm {
    constructor(props:BlogFormProps) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    public componentDidMount() {
        this.onFetch();
    }

    private onFetch() {
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }

        HttpService.get("/api/blogs/" + this.props.match.params.id).then((json) => {
            this.setState({
                content: json.content,
                title: json.title,
                startDateTime: json.startDateTime ? new Date(json.startDateTime) : null,
                endDateTime: json.endDateTime ? new Date(json.endDateTime) : null
            });
        }).catch(() => {
            this.setState({
                message: {
                    message: "Failed to load blog.",
                    type: STATUS.ERROR
                }
            });
        });
    }

    private onDelete() {
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }

        HttpService.delete("/api/blogs/" + this.props.match.params.id).then(() => {
            this.setState({
                message: {
                    type: STATUS.SUCCESS,
                    message: "Blog deleted successfully."
                }
            });

            this.onFetch();
        }).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to delete blog."
                }
            });
        });
    }


    protected onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }

        let payload = {
            _id: this.props.match.params.id,
            title: RefUtil.getValue(this.titleRef, ""),
            content: this.state.content,
            startDateTime: this.state.startDateTime,
            endDateTime: this.state.endDateTime
        };

        HttpService.put("/api/blogs/" + this.props.match.params.id, payload).then(() => {
            this.setState({
                message: {
                    type: STATUS.SUCCESS,
                    message: "Blog updated."
                }
            });
        }).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to update blog."
                }
            });
        });
    }

    protected renderButton() {
        return (
            <div>
                <button>Update Blog</button>
                <button onClick={this.onDelete}>Delete Blog</button>
            </div>
        );
    }
}
