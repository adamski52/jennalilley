import { BaseLinkProps } from '../../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class EditBlogsButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/blogs",
            label: props.label || "Edit Blogs",
            className: props.className || "btn btn-admin icon-document-text-edit",
            authentication: props.authentication
        });
    }
}
