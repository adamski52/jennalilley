import { BaseButtonProps } from '../../states/Button';
import AdminButton from './AdminButton';

export default class DemoteUserButton extends AdminButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "Demote",
            className: props.className || "btn btn-status-warn icon-user-times"
        };
    }
}
