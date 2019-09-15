import { BaseButtonProps } from '../../states/Button';
import BaseButton from './BaseButton';

export default class SendEmailButton extends BaseButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "Send Email",
            className: props.className || "icon-envelope"
        };
    }
}
