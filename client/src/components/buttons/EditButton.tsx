import { BaseLinkProps } from '../../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class EditButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: props.to,
            label: props.label || "Edit",
            className: props.className || "btn btn-admin icon-pencil",
            authentication: props.authentication
        });
    }
}
