import BaseLink from "./BaseLink";
import { BaseLinkProps } from "../../states/Button";

export default abstract class BaseAuthenticatedLink extends BaseLink {
    constructor(props:BaseLinkProps) {
        super({
            to: props.to,
            className: props.className,
            label: props.label
        });

        this.state = {
            authentication: props.authentication
        };
    }

    public componentWillReceiveProps(props:BaseLinkProps) {
        this.setState({
            authentication: props.authentication
        });
    }

    public render() {
        if(!this.state.authentication || !this.state.authentication.isAuthenticated) {
            return null;
        }

        return super.render();
    }
}
