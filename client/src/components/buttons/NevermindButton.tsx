import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class NevermindButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: "/admin",
            label: props.label || "Nevermind",
            className: props.className || "icon-undo"
        };
    }
}
