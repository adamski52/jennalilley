import BaseLink from "./BaseLink";

export default abstract class AdminLink extends BaseLink {
    public render() {
        if(!this.state.authentication || !this.state.authentication.isAdmin) {
            return null;
        }

        return super.render();
    }
}
