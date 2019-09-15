import AuthenticatedLink from './AuthenticatedLink';
import { BaseLinkProps } from '../../states/Button';

export default class AccountButton extends AuthenticatedLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            ...this.state,
            to: props.to || "/account",
            label: props.label || "My Account",
            className: props.className || "icon-lock"
        };
    }
}
