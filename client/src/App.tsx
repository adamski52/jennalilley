import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import Nav from './components/Nav';

import AboutPage from './components/pages/about/AboutPage';
import HomePage from './components/pages/home/HomePage';
import SchedulePage from './components/pages/schedule/SchedulePage';
import ContactPage from './components/pages/contact/ContactPage';
import ScheduleOnePage from './components/pages/schedule/ScheduleOnePage';
import BlogsPage from './components/pages/blogs/BlogsPage';
import AdminPage from './components/admin/AdminPage';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

export default class App extends React.Component<any, any> {
  public render() {
    return (
      <div className="container-fluid main-wrapper">
        <Header/>
        <Router>
            <Nav />
            
            <Route path="/" exact component={HomePage} />

            <Route path="/about/" exact component={AboutPage} />

            <Route path="/blogs/" exact component={BlogsPage} />

            <Route path="/schedule/" exact component={SchedulePage} />
            <Route path="/schedule/:id" exact component={ScheduleOnePage} />

            <Route path="/contact/" component={ContactPage} />

            <Route path="/admin/" component={AdminPage} />
        </Router>
        
      </div>
    );
  }
}
