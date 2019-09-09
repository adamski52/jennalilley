import { BaseButtonProps } from '../../states/Button';
import BaseAdminButton from './BaseAdminButton';

export default class DeleteButton extends BaseAdminButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label || "Delete",
            className: props.className || "btn btn-admin icon-trash",
            authentication: props.authentication
        });
    }
}
