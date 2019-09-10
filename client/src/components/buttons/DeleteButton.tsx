import { BaseButtonProps } from '../../states/Button';
import AdminButton from './AdminButton';

export default class DeleteButton extends AdminButton {
    constructor(props:BaseButtonProps) {
        super(props);
        
        this.state = {
            ...this.state,
            label: props.label || "Delete",
            className: props.className || "btn btn-admin icon-trash",
        };
    }
}
