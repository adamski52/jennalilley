import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from './components/Nav';
import Modal from './components/Modal';

import AboutPage from './components/pages/about/AboutPage';
import HomePage from './components/pages/home/HomePage';
import SchedulePage from './components/pages/schedule/SchedulePage';
import ContactPage from './components/pages/contact/ContactPage';
import ScheduleOnePage from './components/pages/schedule/ScheduleOnePage';
import BlogsPage from './components/pages/blogs/BlogsPage';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import LoginBar from './components/LoginBar';
import HttpService from './services/HttpService';
import { AppState } from './states/App';
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
import HomeForm from './components/admin/home/HomeForm';
import AccountPage from './components/pages/account/AccountPage';
import StatusBar from './components/StatusBar';

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
            },
            modal: {
                title: "",
                message: ""
            }
        };

        this.checkAuth();

        this.setGlobalMessage = this.setGlobalMessage.bind(this);
        this.clearGlobalMessage = this.clearGlobalMessage.bind(this);
        this.setModalMessage = this.setModalMessage.bind(this);
        this.clearModalMessage = this.clearModalMessage.bind(this);
    }

    private async checkAuth() {
        try {
            let response = await HttpService.get("/api/whoami"),
                isAdmin = response.roles.find((role: any) => {
                    return role.name.toUpperCase() === "ADMIN";
                });

            this.setState({
                authentication: {
                    isAdmin: isAdmin,
                    isAuthenticated: true
                }
            });
        }
        catch(e) {
            this.setState({
                authentication: {
                    isAdmin: false,
                    isAuthenticated: false
                }
            });
        }
    }

    private setGlobalMessage(type:string, message:string) {
        this.setState({
            message: {
                type: type,
                message: message
            }
        });
    }

    private clearGlobalMessage() {
        this.setState({
            message: {
                message: "",
                type: ""
            }
        });
    }

    private setModalMessage(title:string, message:string) {
        this.setState({
            modal: {
                title: title,
                message: message
            }
        });
    }

    private clearModalMessage() {
        this.setState({
            modal: {
                title: "",
                message: ""
            }
        });
    }

    public render() {
        let globalProps = {
            authentication: {
                ...this.state.authentication
            },
            setModalMessage: this.setModalMessage,
            setGlobalMessage: this.setGlobalMessage,
            clearGlobalMessage: this.clearGlobalMessage,
            clearModalMessage: this.clearModalMessage
        };

        return (
            <Router>
                <Modal message={this.state.modal.message} title={this.state.modal.title} onClose={this.clearModalMessage} />                
                <div className="container-fluid">
                    <StatusBar message={this.state.message.message} type={this.state.message.type} />

                    <div className="row">
                        <LoginBar {...globalProps} />
                    </div>
                    <div className="row">
                        <Nav {...globalProps} />
                    </div>
                    <div className="row">
                        <div className="col">
                            <Route path="/" exact render={(routeProps) => {
                                return (
                                    <HomePage {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route path="/about/" exact render={(routeProps) => {
                                return (
                                    <AboutPage {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route path="/blogs/" exact render={(routeProps) => {
                                return (
                                    <BlogsPage {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route path="/schedule/" exact render={(routeProps) => {
                                return (
                                    <SchedulePage {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route path="/schedule/:id" exact render={(routeProps) => {
                                return (
                                    <ScheduleOnePage {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route path="/contact/" exact render={(routeProps) => {
                                return (
                                    <ContactPage {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route path="/account/" exact render={(routeProps) => {
                                return (
                                    <AccountPage {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route path="/admin/" exact render={(routeProps) => {
                                return (
                                    <AdminNav {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/home" render={(routeProps) => {
                                return (
                                    <HomeForm {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/about" render={(routeProps) => {
                                return (
                                    <AboutForm {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/blogs" render={(routeProps) => {
                                return (
                                    <BlogsFormList {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/blogs/create" render={(routeProps) => {
                                return (
                                    <BlogCreateForm {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/blogs/edit/:id" render={(routeProps) => {
                                return (
                                    <BlogEditForm {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/schedule" render={(routeProps) => {
                                return (
                                    <ScheduleFormList {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/schedule/create" render={(routeProps) => {
                                return (
                                    <ScheduleCreateForm {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/schedule/edit/:id" render={(routeProps) => {
                                return (
                                    <ScheduleEditForm {...routeProps} {...globalProps} />
                                );
                            }} />

                            <Route exact path="/admin/users" render={(routeProps) => {
                                return (
                                    <UserFormList {...routeProps} {...globalProps}  />
                                );
                            }} />

                            <Route exact path="/admin/contact" render={(routeProps) => {
                                return (
                                    <ContactForm {...routeProps} {...globalProps}  />
                                );
                            }} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
