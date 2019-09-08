import { BaseButtonProps } from '../states/Button';
import BaseButton from './BaseButton';

export default class OKButton extends BaseButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label || "OK",
            className: props.className || "btn btn-status-warn icon-check",
            authentication: props.authentication
        });
    }
}
