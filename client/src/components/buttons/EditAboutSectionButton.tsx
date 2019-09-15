import { BaseLinkProps } from '../../states/Button';
import AdminLink from './AdminLink';

export default class EditAboutSectionButton extends AdminLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: "/admin/about",
            label: props.label || "Edit About Section",
            className: props.className || "icon-info-circle"
        };
    }
}
