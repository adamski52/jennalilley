import { BaseLinkProps } from '../../states/Button';
import BaseAdminLink from './BaseAdminLink';

export default class EditAboutSectionButton extends BaseAdminLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/admin/about",
            label: props.label || "Edit About Section",
            className: props.className || "btn btn-admin icon-info-circle",
            authentication: props.authentication
        });
    }
}
