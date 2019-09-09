import { BaseButtonProps } from '../../states/Button';
import BaseButton from './BaseButton';

export default class Button extends BaseButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label,
            className: props.className || "btn",
            authentication: props.authentication
        });
    }
}
