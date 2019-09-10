import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class CreateBlogButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);
        
        this.state = {
            ...this.state,
            to: "/admin/blogs/create",
            label: props.label || "Create New Blog",
            className: props.className || "btn btn-admin icon-document-text-add"
        };
    }
}
