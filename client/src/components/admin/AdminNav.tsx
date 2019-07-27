import React from "react";
import { Link } from "react-router-dom";
import { AdminViewProps, AdminViewState } from "../states/Admin";
import BaseAdminPage from "./BaseAdminPage";

export default class AdminNav extends BaseAdminPage<AdminViewProps, AdminViewState> {
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
            <div className="main-content">
                <h2>Administration</h2>
                <div className="admin-section">
                    <h3>Home Page</h3>
                    <Link to="/admin/home" className="btn btn-admin icon-home">Edit Home Section</Link>
                </div>
                <div className="admin-section">
                    <h3>About</h3>
                    <Link to="/admin/about" className="btn btn-admin icon-info-circle">Edit About Section</Link>
                </div>
                <div className="admin-section">
                    <h3>Blogs</h3>
                    <Link to="/admin/blogs" className="btn btn-admin icon-document-text-edit">Edit Blogs</Link>
                    <Link to="/admin/blogs/create" className="btn btn-admin icon-document-text-add">Create New Blog</Link>
                </div>
                <div className="admin-section">
                    <h3>Events / Schedule</h3>
                    <Link to="/admin/schedule" className="btn btn-admin icon-calendar">Edit Events</Link>
                    <Link to="/admin/schedule/create" className="btn btn-admin icon-calendar-plus-o">Create New Event</Link>
                </div>
                <div className="admin-section">
                    <h3>Contact</h3>
                    <Link to="/admin/contact" className="btn btn-admin icon-comments">Edit Contact Info</Link>
                </div>
                <div className="admin-section">
                    <h3>Users</h3>
                    <p>(You probably don't want to screw with this)</p>
                    <Link to="/admin/users" className="btn btn-admin icon-users">Edit Users</Link>
                </div>
            </div>
        );
    }
}
