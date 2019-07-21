import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from './components/Nav';

import AboutPage from './components/pages/about/AboutPage';
import HomePage from './components/pages/home/HomePage';
import SchedulePage from './components/pages/schedule/SchedulePage';
import ContactPage from './components/pages/contact/ContactPage';
import ScheduleOnePage from './components/pages/schedule/ScheduleOnePage';
import BlogsPage from './components/pages/blogs/BlogsPage';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import LoginBar from './components/LoginBar';
import HttpService from './util/HttpService';
import { AppState } from './components/states/App';
import AdminNav from './components/admin/AdminNav';
import ContactForm from './components/admin/contact/ContactForm';
import UserFormList from './components/admin/users/UserFormList';
import ScheduleEditForm from './components/admin/schedule/ScheduleEditForm';
import ScheduleCreateForm from './components/admin/schedule/ScheduleCreateForm';
import ScheduleFormList from './components/admin/schedule/ScheduleFormList';
import BlogEditForm from './components/admin/blogs/BlogEditForm';
import BlogCreateForm from './components/admin/blogs/BlogCreateForm';
import AboutForm from './components/admin/about/AboutForm';
import BlogsFormList from './components/admin/blogs/BlogsFormList';
import HeroImage from './components/pages/home/HeroImage';
import ContactBar from './components/ContactBar';

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            authentication: {
                isAdmin: false,
                isAuthenticated: false
            },
            message: {
                message: "",
                type: ""
            }
        };

        HttpService.get("/api/whoami").then((response) => {
            let isAdmin = response.roles.find((role: any) => {
                return role.name.toUpperCase() === "ADMIN";
            });

            this.setState({
                authentication: {
                    isAdmin: isAdmin,
                    isAuthenticated: true
                }
            });
        }).catch(() => {
            this.setState({
                authentication: {
                    isAdmin: false,
                    isAuthenticated: false
                }
            });
        });
    }

    public render() {
        return (
            <Router>
                <LoginBar {...this.state.authentication} />

                <Route path="/" exact render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="col-lg-3 col-md-4 col-sm-4 col-xs-7 home" {...routeProps}  {...this.state.authentication} />
                            <div className="home-page row">
                                <HeroImage {...routeProps} {...this.state.authentication} />
                                <div className="col-xs-12 col-sm-8">
                                    <HomePage {...routeProps} {...this.state.authentication} />
                                </div>
                                <div className="col-xs-12 col-sm-4 left-bar">
                                    <ContactBar />
                                </div>
                            </div>
                        </div>
                    );
                }} />

                <Route path="/about/" exact render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <AboutPage {...routeProps} {...this.state.authentication} />
                                </div>
                                <div className="col-xs-12 col-sm-4 left-bar">
                                    <ContactBar />
                                </div>
                            </div>
                        </div>
                    );
                }} />

                <Route path="/blogs/" exact render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <BlogsPage {...routeProps} {...this.state.authentication} />
                                </div>
                                <div className="col-xs-12 col-sm-4 left-bar">
                                    <ContactBar />
                                </div>
                            </div>
                        </div>
                    );
                }} />

                <Route path="/schedule/" exact render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <SchedulePage {...routeProps} {...this.state.authentication} />
                                </div>
                                <div className="col-xs-12 col-sm-4 left-bar">
                                    <ContactBar />
                                </div>
                            </div>
                        </div>
                    );
                }} />

                <Route path="/schedule/:id" exact render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <ScheduleOnePage {...routeProps} {...this.state.authentication} />
                                </div>
                                <div className="col-xs-12 col-sm-4 left-bar">
                                    <ContactBar />
                                </div>
                            </div>
                        </div>
                    );
                }} />

                <Route path="/contact/" exact render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <div className="row">
                                <div className="col-xs-12 col-sm-8">
                                    <ContactPage {...routeProps} {...this.state.authentication} />
                                </div>
                                <div className="col-xs-12 col-sm-4 left-bar">
                                    <ContactBar />
                                </div>
                            </div>
                        </div>
                    );
                }} />

                <Route path="/admin/" exact render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <AdminNav {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/about" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <AboutForm {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/blogs" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <BlogsFormList {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/blogs/create" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <BlogCreateForm {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/blogs/edit/:id" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <BlogEditForm {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/schedule" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <ScheduleFormList {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/schedule/create" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <ScheduleCreateForm {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/schedule/edit/:id" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <ScheduleEditForm {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/users" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <UserFormList {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />

                <Route exact path="/admin/contact" render={(routeProps) => {
                    return (
                        <div className="container-fluid">
                            <Nav className="row inner" {...routeProps} {...this.state.authentication} />
                            <ContactForm {...routeProps} {...this.state.authentication} />
                        </div>
                    );
                }} />
            </Router>
        );
    }
}
