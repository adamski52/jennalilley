import React, { MouseEvent } from 'react';
import BlogForm from './BlogForm';import { BlogFormProps } from '../../states/Blogs';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import RefUtil from '../../../util/RefUtil';
import NevermindButton from '../../buttons/NevermindButton';
import DeleteButton from '../../buttons/DeleteButton';
import SaveButton from '../../buttons/SaveButton';

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
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to load blog.");
        });
    }

    private onDelete() {
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }

        HttpService.delete("/api/blogs/" + this.props.match.params.id).then(() => {
            this.props.setGlobalMessage(STATUS.SUCCESS, "Blog deleted successfully.");
            
            this.onFetch();
        }).catch(() => {
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to delete blog.");
        });
    }


    protected onSubmit(e:MouseEvent<HTMLButtonElement>) {
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
            this.props.setGlobalMessage(STATUS.SUCCESS, "Blog updated successfully.");
        }).catch(() => {
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to update blog.");
        });
    }

    protected renderButton() {
        return (
            <div>
                <NevermindButton authentication={this.props.authentication} />
                <DeleteButton authentication={this.props.authentication} />
                <SaveButton authentication={this.props.authentication} />
            </div>
        );
    }
}
