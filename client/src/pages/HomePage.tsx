import PageContainer from "../containers/PageContainer";
import { HomePageProps, HomePageState } from "../states/Home";
import React from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import HomePageHandler from "../handlers/HomePageHandler";

class HomePage extends PageContainer<HomePageProps, HomePageState> {
    public render():JSX.Element | null {
        return (
            <h2>Home page</h2>
        );
    }
}

export default connect(
    (state:HomePageState) => {
        return {
            ...state
        };
    },
    (dispatch:Dispatch) => {
        return {
            fetch: () => {
                return HomePageHandler.METHODS.fetch(dispatch);
            }
        };
    }
)(HomePage);