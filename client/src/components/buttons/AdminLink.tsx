import BaseLink from "./BaseLink";
import { BaseLinkProps } from "../../states/Button";

export default abstract class AdminLink extends BaseLink {
    constructor(props:BaseLinkProps) {
        super(props);

        this.state = {
            to: props.to || "",
            className: props.className || "",
            label: props.label || "",
            authentication: props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        };
    }

    public componentWillReceiveProps(props:BaseLinkProps) {
        this.setState({
            to: props.to || "",
            className: props.className || "",
            label: props.label || "",
            authentication: props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        });
    }

    public render() {
        if(!this.state.authentication || !this.state.authentication.isAdmin) {
            return null;
        }

        return super.render();
    }
}
