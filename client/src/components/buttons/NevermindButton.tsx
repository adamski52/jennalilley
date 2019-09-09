import { BaseLinkProps } from '../../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class NevermindButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin",
            label: props.label || "Nevermind",
            className: props.className || "btn btn-admin icon-undo",
            authentication: props.authentication
        });
    }
}
