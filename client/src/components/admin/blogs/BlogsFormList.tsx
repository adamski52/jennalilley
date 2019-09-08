import React from 'react';
import { BlogFormProps, BlogViewAllState } from '../../states/Blogs';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import { IBlog } from '../../../interfaces/Blog';
import BaseAdminPage from '../BaseAdminPage';
import DeleteButton from '../../buttons/DeleteButton';
import EditButton from '../../buttons/EditButton';

export default class BlogsFormList extends BaseAdminPage<BlogFormProps, BlogViewAllState> {
    constructor(props: BlogFormProps) {
        super(props);

        this.state = {
            authenticated: props.authentication,
            items: []
        };

        this.onDelete = this.onDelete.bind(this);

        this.onFetch();
    }

    private onFetch() {
        HttpService.get("/api/blogs").then((json) => {
            this.setState({
                items: json
            });
        }).catch((e) => {
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to load blogs.");
        });
    }

    private onDelete(blog: IBlog) {
        return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            HttpService.delete("/api/blogs/" + blog._id).then(() => {
                this.props.setGlobalMessage(STATUS.ERROR, "Blog deleted successfully.");
                
                this.onFetch();
            }).catch(() => {
                this.props.setGlobalMessage(STATUS.ERROR, "Failed to delete blog.");
            });
        };
    }

    private renderItem(blog: any) {
        return (
            <div key={blog._id}>
                <EditButton to={"/admin/blogs/edit/" + blog._id} label={blog.title} authentication={this.props.authentication} />
                {blog.startDateTime}
                {blog.endDateTime}
                <DeleteButton onClick={this.onDelete(blog)} authentication={this.props.authentication} />
            </div>
        );
    }

    private renderItems() {
        return this.state.items.map((item: any) => {
            return this.renderItem(item);
        });
    }

    protected renderAuthenticatedView() {
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}
