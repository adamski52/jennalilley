import BaseAuthenticatedLink from './BaseAuthenticatedLink';
import { BaseLinkProps } from '../../states/Button';

export default class AccountButton extends BaseAuthenticatedLink {
    constructor(props:BaseLinkProps) {
        super({
            to: "/account",
            label: props.label || "My Account",
            className: props.className || "btn btn-account icon-lock",
            authentication: props.authentication
        });
    }
}
