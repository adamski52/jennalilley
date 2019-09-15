import { BaseButtonProps } from '../../states/Button';
import Button from './BaseButton';

export default class OKButton extends Button {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "OK",
            className: props.className || "icon-check"
        };
    }
}
