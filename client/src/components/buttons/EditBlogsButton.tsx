import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class EditBlogsButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: "/admin/blogs",
            label: props.label || "Edit Blogs",
            className: props.className || "btn btn-admin icon-document-text-edit"
        };
    }
}
