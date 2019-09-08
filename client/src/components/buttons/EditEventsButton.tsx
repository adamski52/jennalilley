import { BaseLinkProps } from '../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class EditEventsButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/schedule",
            label: props.label || "Edit Events",
            className: props.className || "btn btn-admin icon-calendar",
            authentication: props.authentication
        });
    }
}
