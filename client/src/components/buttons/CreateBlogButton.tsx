import { BaseLinkProps } from '../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class CreateBlogButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/blogs/create",
            label: props.label || "Create New Blog",
            className: props.className || "btn btn-admin icon-document-text-add",
            authentication: props.authentication
        });
    }
}
