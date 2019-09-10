import { BaseButtonProps } from '../../states/Button';
import Button from './Button';

export default class SendEmailButton extends Button {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "Send Email",
            className: props.className || "btn btn-email icon-envelope"
        };
    }
}
