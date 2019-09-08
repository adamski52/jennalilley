import { BaseButtonProps } from "../states/Button";
import BaseAdminButton from "./BaseAdminButton";

export default class SaveBlogButton extends BaseAdminButton {
    constructor(props:BaseButtonProps) {
        super({
            onClick: props.onClick,
            label: props.label || "Create New Blog",
            className: props.className || "btn btn-admin icon-document-text-add",
            authentication: props.authentication
        });
    }
}
