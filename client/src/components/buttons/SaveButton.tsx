import { BaseButtonProps } from '../states/Button';
import BaseAdminButton from './BaseAdminButton';

export default class SaveButton extends BaseAdminButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label || "Save",
            className: props.className || "btn btn-admin icon-floppy-o",
            authentication: props.authentication
        });
    }
}
