import SecurePageContainer from "./SecurePageContainer";
import { AdminPageContainerBaseProps, AdminPageContainerBaseState } from "../states/Containers";

export default abstract class AdminPageContainer<P extends AdminPageContainerBaseProps, S extends AdminPageContainerBaseState> extends SecurePageContainer<AdminPageContainerBaseProps, AdminPageContainerBaseState> {
    public render():JSX.Element | null {
        if(this.state.authentication.isAuthenticated && this.state.authentication.isAdmin) {
            return this.renderAuthenticated();
        }

        return this.renderUnauthenticated();
    }
}