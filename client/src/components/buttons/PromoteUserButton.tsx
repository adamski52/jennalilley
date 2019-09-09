import { BaseButtonProps } from '../../states/Button';
import BaseAdminButton from './BaseAdminButton';

export default class PromoteUserButton extends BaseAdminButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label || "Promote",
            className: props.className || "btn btn-status-warn icon-user-plus",
            authentication: props.authentication
        });
    }
}
