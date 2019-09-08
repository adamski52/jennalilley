import { BaseLinkProps } from '../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class EditHomeButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/home",
            label: props.label || "Edit Home Section",
            className: props.className || "btn btn-admin icon-home",
            authentication: props.authentication
        });
    }
}
