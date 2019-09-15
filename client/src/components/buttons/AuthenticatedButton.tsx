import BaseButton from "./BaseButton";

export default abstract class AuthenticatedButton extends BaseButton {
    public render() {
        if(!this.state.authentication || !this.state.authentication.isAuthenticated) {
            return null;
        }

        return super.render();
    }
}
