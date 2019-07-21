import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomePage from './pages/HomePage';
import AdminPage from './pages/admin/AdminPage';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { AppState, AppProps } from './states/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './handlers'
import thunk from 'redux-thunk';
import ContactPage from './pages/ContactPage';
import { Nav } from './components/Nav';

export default class App extends React.Component<AppProps, AppState> {
    private store = createStore(reducer, applyMiddleware(thunk));;

    public render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/admin">Admin</Link>

                    <Route path="/" exact render={(routeProps) => {
                        return (
                            <div className="container-fluid">
                                <Nav className="home" />
                                <HomePage {...routeProps} {...this.state} />
                            </div>
                        );
                    }} />

                    <Route path="/contact" exact render={(routeProps) => {
                        return (
                            <div className="container-fluid">
                                <Nav className="inner" />
                                <ContactPage {...routeProps} {...this.state} />
                            </div>
                        );
                    }} />

                    <Route path="/admin" exact render={(routeProps) => {
                        return (
                            <div className="container-fluid">
                                <Nav className="inner" />
                                <AdminPage {...this.state} />
                            </div>
                        );
                    }} />
                </Router>
            </Provider>
        );
    }
}
