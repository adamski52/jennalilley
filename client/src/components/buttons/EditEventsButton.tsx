import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class EditEventsButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: "/admin/schedule",
            label: props.label || "Edit Events",
            className: props.className || "btn btn-admin icon-calendar"
        };
    }
}
