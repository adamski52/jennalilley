import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class CreateEventButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);
        
        this.state = {
            ...this.state,
            to: "/admin/schedule/create",
            label: props.label || "Create New Event",
            className: props.className || "btn btn-admin icon-calendar-plus-o"
        };
    }
}
