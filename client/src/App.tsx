import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
import LoginBar from './components/LoginBar';
import HttpService from './util/HttpService';
import { AppState } from './components/states/App';

export default class App extends React.Component<any, AppState> {
  constructor(props:any) {
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
      let isAdmin = response.roles.find((role:any) => {
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
                <div>
                  <Nav className="col-lg-3 col-md-4 col-sm-4 col-xs-7 home" {...routeProps}  {...this.state.authentication} />
                  <HomePage {...routeProps} {...this.state.authentication} />
                </div>
              );
            }}/>

            <Route path="/about/" exact render={(routeProps) => {
              return (
                <div>
                  <Nav className="inner" {...routeProps} {...this.state.authentication} />
                  <AboutPage {...routeProps} {...this.state.authentication} />
                </div>
              );
            }}/>

            <Route path="/blogs/" exact render={(routeProps) => {
              return (
                <div>
                  <Nav className="inner" {...routeProps} {...this.state.authentication} />
                  <BlogsPage {...routeProps} {...this.state.authentication} />
                </div>
              );
            }}/>

            <Route path="/schedule/" exact render={(routeProps) => {
              return (
                <div>
                  <Nav className="inner" {...routeProps} {...this.state.authentication} />
                  <SchedulePage {...routeProps} {...this.state.authentication} />
                </div>
              );
            }}/>

            <Route path="/schedule/:id" exact render={(routeProps) => {
              return (
                <div>
                  <Nav className="inner" {...routeProps} {...this.state.authentication} />
                  <ScheduleOnePage {...routeProps} {...this.state.authentication} />
                </div>
              );
            }}/>

            <Route path="/contact/" render={(routeProps) => {
              return (
                <div>
                  <Nav className="inner" {...routeProps} {...this.state.authentication} />
                  <ContactPage {...routeProps} {...this.state.authentication} />
                </div>
              );
            }}/>

            <Route path="/admin/" render={(routeProps) => {
              return (
                <div>
                  <Nav className="inner" {...routeProps} {...this.state.authentication} />
                  <AdminPage {...routeProps} {...this.state.authentication} />
                </div>
              );
            }}/>
        </Router>
    );
  }
}
