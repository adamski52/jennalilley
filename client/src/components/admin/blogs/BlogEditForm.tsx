import React, { MouseEvent } from 'react';
import BlogForm from './BlogForm';import { BlogFormProps } from '../../../states/Blogs';
import RefUtil from '../../../util/RefUtil';
import NevermindButton from '../../buttons/NevermindButton';
import DeleteButton from '../../buttons/DeleteButton';
import SaveButton from '../../buttons/SaveButton';
import BlogsService from '../../../services/BlogsService';

export default class BlogEditForm extends BlogForm {
    constructor(props:BlogFormProps) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    public componentDidMount() {
        this.onFetch();
    }

    private async onFetch() {
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }

        try {
            let json = await BlogsService.readOne(this.props.setGlobalMessage, this.props.match.params.id);
            this.setState({
                content: json.content,
                title: json.title,
                startDateTime: json.startDateTime ? new Date(json.startDateTime) : null,
                endDateTime: json.endDateTime ? new Date(json.endDateTime) : null
            });
        } catch(e) {}
    }

    private async onDelete() {
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }
        
        try {
            await BlogsService.delete(this.props.setGlobalMessage, this.props.match.params.id);
            this.onFetch();
        }
        catch(e) {}
    }


    protected async onSubmit(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }

        try {
            await BlogsService.update(this.props.setGlobalMessage, {
                _id: this.props.match.params.id,
                title: RefUtil.getValue(this.titleRef, ""),
                content: this.state.content,
                startDateTime: this.state.startDateTime,
                endDateTime: this.state.endDateTime
            });
        } catch(e) {}
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
