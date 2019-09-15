import BaseButton from "./BaseButton";

export default abstract class AdminButton extends BaseButton {
    public render() {
        if(!this.state.authentication || !this.state.authentication.isAdmin) {
            return null;
        }

        return super.render();
    }
}
