import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-quill/dist/quill.snow.css';

import AboutPage from './components/pages/about/AboutPage';
import HomePage from './components/pages/home/HomePage';
import AdminPage from './components/pages/admin/AdminPage';

export default class App extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Router>
          <Link to="/">Home</Link>
          <Link to="/about/">About</Link>
          <Link to="/admin">Admin</Link>
          
          <Route path="/" exact component={HomePage} />
          <Route path="/about/" component={AboutPage} />
          <Route path="/admin/" component={AdminPage} />
        </Router>
      </div>
    );
  }
}
