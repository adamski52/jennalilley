import { BaseLinkProps } from '../../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class EditUsersButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/users",
            label: props.label || "Edit Users",
            className: props.className || "btn btn-admin icon-users",
            authentication: props.authentication
        });
    }
}
