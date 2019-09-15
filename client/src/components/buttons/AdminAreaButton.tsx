import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class AdminAreaButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: props.to || "/admin",
            label: props.label || "My Account",
            className: props.className || "icon-lock"
        };
    }
}
