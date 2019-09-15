import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class EditButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "Edit",
            className: props.className || "icon-pencil"
        };
    }
}
