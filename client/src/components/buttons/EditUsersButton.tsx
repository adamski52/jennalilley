import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class EditUsersButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: "/admin/users",
            label: props.label || "Edit Users",
            className: props.className || "btn btn-admin icon-users"
        };
    }
}
