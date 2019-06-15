import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-quill/dist/quill.snow.css';

import AboutPage from './components/pages/about/AboutPage';
import HomePage from './components/pages/home/HomePage';
import AdminPage from './components/pages/admin/AdminPage';
import BlogsPage from './components/pages/blogs/BlogsPage';
import SchedulePage from './components/pages/schedule/SchedulePage';
import ContactPage from './components/pages/contact/ContactPage';

export default class App extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Router>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about/">About</Link></li>
            <li><Link to="/blogs/">Blogs</Link></li>
            <li><Link to="/schedule/">Schedule</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
          
          <Route path="/" exact component={HomePage} />
          <Route path="/about/" component={AboutPage} />
          <Route path="/blogs/" component={BlogsPage} />
          <Route path="/schedule/" component={SchedulePage} />
          <Route path="/contact/" component={ContactPage} />

          <Route path="/admin/" component={AdminPage} />
        </Router>
      </div>
    );
  }
}
