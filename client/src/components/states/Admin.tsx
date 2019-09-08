export interface AdminAuthentication {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export interface AdminViewState {
    authentication: AdminAuthentication
};

export interface AdminViewProps {
    authentication: AdminAuthentication;
};
