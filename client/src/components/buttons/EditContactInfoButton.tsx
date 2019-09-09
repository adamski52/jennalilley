import { BaseLinkProps } from '../../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class EditContactInfoButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/contact",
            label: props.label || "Edit Contact Info",
            className: props.className || "btn btn-admin icon-comments",
            authentication: props.authentication
        });
    }
}
