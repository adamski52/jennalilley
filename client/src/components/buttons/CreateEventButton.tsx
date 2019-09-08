import { BaseLinkProps } from '../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class CreateEventButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/schedule/create",
            label: props.label || "Create New Event",
            className: props.className || "btn btn-admin icon-calendar-plus-o",
            authentication: props.authentication
        });
    }
}
