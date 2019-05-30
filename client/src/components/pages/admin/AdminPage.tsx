import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutForm from "./about/AboutForm";
import BlogForm from "./blogs/BlogForm";
import ScheduleForm from "./schedule/ScheduleForm";
import UserList from "./users/UserList";
import ContactForm from "./contact/ContactForm";


export default class AdminPage extends React.Component<any, any> {
    public render() {
        return (
            <div>
            <Router>
                <Link to="/admin/about/">About Form</Link>
                <Link to="/admin/blogs/">Blogs Form</Link>
                <Link to="/admin/schedule/">Schedule Form</Link>
                <Link to="/admin/users/">Users Form</Link>
                <Link to="/admin/contact/">Contact Form</Link>



                <Route path="/admin/about/" component={AboutForm} />
                <Route path="/admin/blogs/" component={BlogForm} />
                <Route path="/admin/schedule/" component={ScheduleForm} />
                <Route path="/admin/users/" component={UserList} />
                <Route path="/admin/contact/" component={ContactForm} />

            </Router>
            </div>
        );
    }
}
