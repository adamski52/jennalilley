import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutForm from "./about/AboutForm";
import UserFormList from "./users/UserFormList";
import ContactForm from "./contact/ContactForm";
import BlogsFormList from "./blogs/BlogsFormList";
import BlogCreateForm from "./blogs/BlogCreateForm";
import BlogEditForm from "./blogs/BlogEditForm";
import ScheduleCreateForm from "./schedule/ScheduleCreateForm";
import ScheduleEditForm from "./schedule/ScheduleEditForm";
import ScheduleFormList from "./schedule/ScheduleFormList";
import BaseSecurePage from "./BaseSecurePage";
import { AdminViewProps, AdminViewState } from "../states/Admin";
import AdminNav from "./AdminNav";

export default class AdminPage extends BaseSecurePage<AdminViewProps, AdminViewState> {
    constructor(props:AdminViewProps) {
        super(props);

        this.state = {
            isAuthenticated: !!props.isAuthenticated,
            isAdmin: !!props.isAdmin,
            message: {
                message: "",
                type: ""
            }
        };
    }

    protected renderAuthenticatedView() {
        return (
            <Router>
                <Route exact path="/admin/" render={(routeProps) => {
                    return (
                        <AdminNav {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/about/" render={(routeProps) => {
                    return (
                        <AboutForm {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/blogs/" render={(routeProps) => {
                    return (
                        <BlogsFormList {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/blogs/create/" render={(routeProps) => {
                    return (
                        <BlogCreateForm {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/blogs/edit/:id/" render={(routeProps) => {
                    return (
                        <BlogEditForm {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/schedule/" render={(routeProps) => {
                    return (
                        <ScheduleFormList {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/schedule/create/" render={(routeProps) => {
                    return (
                        <ScheduleCreateForm {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/schedule/edit/:id/" render={(routeProps) => {
                    return (
                        <ScheduleEditForm {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>

                <Route exact path="/admin/users/" render={(routeProps) => {
                    return (
                        <UserFormList {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated}/>
                    );
                }}/>

                <Route exact path="/admin/contact/" render={(routeProps) => {
                    return (
                        <ContactForm {...routeProps} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
                    );
                }}/>
            </Router>
        );
    }
}
