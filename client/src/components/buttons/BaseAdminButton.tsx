import BaseButton from "./BaseButton";
import { BaseButtonProps } from "../../states/Button";

export default abstract class BaseAdminButton extends BaseButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            className: props.className,
            label: props.label
        });

        this.state = {
            authentication: props.authentication
        };
    }

    public componentWillReceiveProps(props:BaseButtonProps) {
        this.setState({
            authentication: props.authentication
        });
    }

    public render() {
        if(!this.state.authentication || !this.state.authentication.isAdmin) {
            return null;
        }

        return super.render();
    }
}
