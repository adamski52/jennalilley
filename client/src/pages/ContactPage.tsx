import PageContainer from "../containers/PageContainer";
import React from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ContactPageState, ContactPageProps } from "../states/Contact";

class ContactPage extends PageContainer<ContactPageProps, ContactPageState> {
    public render():JSX.Element | null {
        return (
            <h2>Contact page</h2>
        );
    }
}

export default connect(
    (state:ContactPageState) => {
        return {
            ...state
        };
    },
    (dispatch:Dispatch) => {
        return {
            
        };
    }
)(ContactPage);