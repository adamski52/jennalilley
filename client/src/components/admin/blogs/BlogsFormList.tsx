import React from 'react';
import { BlogFormProps, BlogViewAllState } from '../../../states/Blogs';
import { IBlog } from '../../../interfaces/Blog';
import BaseAdminPage from '../BaseAdminPage';
import DeleteButton from '../../buttons/DeleteButton';
import EditButton from '../../buttons/EditButton';
import BlogsService from '../../../services/BlogsService';

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

    private async onFetch() {
        let json = BlogsService.readAll(this.props.setGlobalMessage);
        this.setState({
            items: json
        });
    }

    private onDelete(blog: IBlog) {
        return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            try {
                await BlogsService.delete(this.props.setGlobalMessage, blog._id);
                this.onFetch();
            } catch(e) {}
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
