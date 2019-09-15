import BaseLink from "./BaseLink";

export default abstract class AuthenticatedLink extends BaseLink {
    public render() {
        if(!this.state.authentication || !this.state.authentication.isAuthenticated) {
            return null;
        }

        return super.render();
    }
}
