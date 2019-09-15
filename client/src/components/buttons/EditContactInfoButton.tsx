import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class EditContactInfoButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: "/admin/contact",
            label: props.label || "Edit Contact Info",
            className: props.className || "icon-comments"
        };
    }
}
