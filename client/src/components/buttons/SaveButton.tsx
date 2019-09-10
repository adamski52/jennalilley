import { BaseButtonProps } from '../../states/Button';
import AdminButton from './AdminButton';

export default class SaveButton extends AdminButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "Save",
            className: props.className || "btn btn-admin icon-floppy-o"
        };
    }
}
