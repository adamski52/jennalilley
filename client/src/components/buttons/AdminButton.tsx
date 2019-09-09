import { BaseLinkProps } from '../../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class AdminButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin",
            label: props.label || "Admin",
            className: props.className || "btn btn-admin icon-lock",
            authentication: props.authentication
        });
    }
}
