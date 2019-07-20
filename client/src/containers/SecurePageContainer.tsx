import PageContainer from "./PageContainer";
import { SecurePageContainerBaseProps, SecurePageContainerBaseState } from "../components/states/Containers";
import HttpService from "../util/HttpService";

export default abstract class SecurePageContainer<P extends SecurePageContainerBaseProps, S extends SecurePageContainerBaseState> extends PageContainer<SecurePageContainerBaseProps, SecurePageContainerBaseState> {
    constructor(props: SecurePageContainerBaseProps) {
        super(props);

        this.state = {
            authentication: {
                isAdmin: false,
                isAuthenticated: false
            }
        };
    }

    protected renderUnauthenticated():JSX.Element | null {
        return null;
    }

    protected renderAuthenticated():JSX.Element | null {
        return null;
    }

    public render():JSX.Element | null {
        if(this.state.authentication.isAuthenticated) {
            return this.renderAuthenticated();
        }

        return this.renderUnauthenticated();
    }

    public async componentDidMount() {
        try {
            let whoAmI = await HttpService.get("/api/whoami");
            if (!whoAmI) {
                throw new Error("Unauthenticated");
            }

            let isAdmin = whoAmI.roles.find((role: any) => {
                return role.name.toUpperCase() === "ADMIN";
            });

            this.setState({
                authentication: {
                    isAdmin: isAdmin,
                    isAuthenticated: true
                }
            });

            this.onFetch();
        }
        catch (e) {
            this.setState({
                authentication: {
                    isAdmin: false,
                    isAuthenticated: false
                }
            });
        }
    }
}