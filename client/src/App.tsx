import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from './components/pages/home/HomePage';
import AdminPage from './components/admin/AdminPage';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { AppState, AppProps } from './components/states/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './handlers'
import thunk from 'redux-thunk';

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props);
    }

    private store = createStore(reducer, applyMiddleware(thunk));;

    public render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <Route path="/" exact render={(routeProps) => {
                        return (
                            <HomePage {...routeProps} {...this.state} />
                        );
                    }} />

                    <Route path="/admin" exact render={(routeProps) => {
                        return (
                            <AdminPage {...this.state} />
                        );
                    }} />
                </Router>
            </Provider>
        );
    }
}
