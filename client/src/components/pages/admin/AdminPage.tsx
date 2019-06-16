import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutForm from "./about/AboutForm";
import UserFormList from "./users/UserFormList";
import ContactForm from "./contact/ContactForm";
import BlogsFormList from "./blogs/BlogsFormList";
import BlogCreateForm from "./blogs/BlogCreateForm";
import BlogEditForm from "./blogs/BlogEditForm";
import ScheduleCreateForm from "./schedule/ScheduleCreateForm";
import ScheduleEditForm from "./schedule/ScheduleEditForm";
import ScheduleFormList from "./schedule/ScheduleFormList";

export default class AdminPage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Router>
                    <ul>
                        <li><Link to="/admin/about/">About</Link></li>
                        <li><Link to="/admin/blogs/">Blogs</Link></li>
                        <li><Link to="/admin/blogs/create/">Create Blog</Link></li>
                        <li><Link to="/admin/schedule/">Events</Link></li>
                        <li><Link to="/admin/schedule/create">Create Event</Link></li>
                        <li><Link to="/admin/users/">Users</Link></li>
                        <li><Link to="/admin/contact/">Contact</Link></li>
                    </ul>

                    <Route path="/admin/about/" component={AboutForm} />

                    <Route exact path="/admin/blogs/" component={BlogsFormList} />
                    <Route exact path="/admin/blogs/create/" component={BlogCreateForm} />
                    <Route exact path="/admin/blogs/edit/:id/" component={BlogEditForm} />

                    <Route exact path="/admin/schedule/" component={ScheduleFormList} />
                    <Route exact path="/admin/schedule/create" component={ScheduleCreateForm} />
                    <Route exact path="/admin/schedule/edit/:id/" component={ScheduleEditForm} />

                    <Route path="/admin/users/" component={UserFormList} />

                    <Route path="/admin/contact/" component={ContactForm} />
                </Router>
            </div>
        );
    }
}
