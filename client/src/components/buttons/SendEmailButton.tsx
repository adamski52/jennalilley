import { BaseButtonProps } from '../../states/Button';
import BaseButton from './BaseButton';

export default class SendEmailButton extends BaseButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label || "Send Email",
            className: props.className || "btn btn-email icon-envelope",
            authentication: props.authentication
        });
    }
}
