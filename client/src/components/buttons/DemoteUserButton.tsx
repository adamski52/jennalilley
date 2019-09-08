import { BaseButtonProps } from '../states/Button';
import BaseAdminButton from './BaseAdminButton';

export default class DemoteUserButton extends BaseAdminButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label || "Demote",
            className: props.className || "btn btn-status-warn icon-user-times",
            authentication: props.authentication
        });
    }
}
