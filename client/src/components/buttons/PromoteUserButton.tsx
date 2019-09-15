import { BaseButtonProps } from '../../states/Button';
import AdminButton from './AdminButton';

export default class PromoteUserButton extends AdminButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "Promote",
            className: props.className || "icon-user-plus"
        };
    }
}
