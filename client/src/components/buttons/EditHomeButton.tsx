import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class EditHomeButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: "/admin/home",
            label: props.label || "Edit Home Section",
            className: props.className || "icon-home"
        };
    }
}
