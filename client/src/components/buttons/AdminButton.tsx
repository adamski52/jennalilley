import Button from "./Button";
import { BaseButtonProps } from "../../states/Button";
import { MouseEvent } from 'react';

export default abstract class AdminButton extends Button {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            className: props.className,
            label: props.label
        });

        this.state = {
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {}),
            className: props.className || "",
            label: props.label || "",
            authentication: props.authentication || {
                isAdmin: false,
                isAuthenticated: false
            }
        };
    }

    public componentWillReceiveProps(props:BaseButtonProps) {
        this.setState({
            onClick: props.onClick || ((e:MouseEvent<HTMLButtonElement>) => {}),
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


//     onstructor(props:BaseLinkProps) {
//         super({
//             ...props,
//             to: "/admin",
//             label: props.label || "Admin",
//             className: props.className || "btn btn-admin icon-lock",
//             authentication: props.authentication
//         });
//     }
// }

}
