import React from "react";
import { AdminViewProps, AdminViewState } from "../../states/Admin";
import BaseAdminPage from "./BaseAdminPage";
import EditHomeButton from "../buttons/EditHomeButton";
import EditAboutSectionButton from "../buttons/EditAboutSectionButton";
import EditBlogsButton from "../buttons/EditBlogsButton";
import CreateBlogButton from "../buttons/CreateBlogButton";
import EditEventsButton from "../buttons/EditEventsButton";
import CreateEventButton from "../buttons/CreateEventButton";
import EditContactInfoButton from "../buttons/EditContactInfoButton";
import EditUsersButton from "../buttons/EditUsersButton";

export default class AdminNav extends BaseAdminPage<AdminViewProps, AdminViewState> {
    constructor(props:AdminViewProps) {
        super(props);

        this.state = {
            authentication: props.authentication
        };
    }

    protected renderAuthenticatedView() {
        return (
            <div className="main-content">
                <h2>Administration</h2>
                <div className="admin-section">
                    <h3>Home Page</h3>
                    <EditHomeButton authentication={this.props.authentication} />
                </div>
                <div className="admin-section">
                    <h3>About</h3>
                    <EditAboutSectionButton authentication={this.props.authentication} />
                </div>
                <div className="admin-section">
                    <h3>Blogs</h3>
                    <EditBlogsButton authentication={this.props.authentication} />
                    <CreateBlogButton authentication={this.props.authentication} />
                </div>
                <div className="admin-section">
                    <h3>Events / Schedule</h3>
                    <EditEventsButton authentication={this.props.authentication} />
                    <CreateEventButton authentication={this.props.authentication} />
                </div>
                <div className="admin-section">
                    <h3>Contact</h3>
                    <EditContactInfoButton authentication={this.props.authentication} />
                </div>
                <div className="admin-section">
                    <h3>Users</h3>
                    <p>(You probably don't want to screw with this)</p>
                    <EditUsersButton authentication={this.props.authentication} />
                </div>
            </div>
        );
    }
}
