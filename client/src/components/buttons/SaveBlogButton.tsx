import { BaseButtonProps } from "../../states/Button";
import AdminButton from "./AdminButton";

export default class SaveBlogButton extends AdminButton {
    constructor(props:BaseButtonProps) {
        super(props);

        this.state = {
            ...this.state,
            label: props.label || "Create New Blog",
            className: props.className || "btn btn-admin icon-document-text-add"
        };
    }
}
