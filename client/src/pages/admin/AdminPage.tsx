import { AdminPageProps, AdminPageState } from "../../states/Admin";
import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import AdminPageContainer from "../../containers/AdminPageContainer";

export class AdminPage extends AdminPageContainer<AdminPageProps, AdminPageState> {
    protected renderUnauthenticated():JSX.Element | null {
        return (
            <h2>Unauthenticated.</h2>
        );
    }

    protected renderAuthenticated():JSX.Element | null {
        return (
            <h2>Authenticated.</h2>
        );
    }
}

export default connect(
    (state:AdminPageState) => {
        return {
            ...state
        };
    },
    (dispatch:Dispatch) => {
        return {
            
        };
    }
)(AdminPage);