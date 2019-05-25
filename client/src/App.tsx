import React from 'react';
import {style} from "typestyle";
import fetch from "cross-fetch";
import Cookies from 'js-cookie';
import UserList from './components/UserList';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import ScheduleForm from './components/forms/ScheduleForm';
import ScheduleList from './components/ScheduleList';

export default class App extends React.Component<any, any> {
  private demoClassName = style({
    color: "#f00"
  });

  constructor(props:any) {
    super(props);

    this.state = {
      userId: "5ce1da1cf192da26f60bf605"
    };

    this.doInsecure = this.doInsecure.bind(this);
    this.doSecure = this.doSecure.bind(this);
    this.doUsers = this.doUsers.bind(this);
    this.doUserById = this.doUserById.bind(this);
    this.doCreateUser = this.doCreateUser.bind(this);
    this.doDeleteById = this.doDeleteById.bind(this);
  }

  private doDeleteById() {
    fetch("/api/users/" + this.state.userId, {
      method: "DELETE",
      headers: {
        "Authorization": "JWT " + Cookies.get("TOKEN")
      }
    }).then((response:Response) => {
      console.log("delete by id", response);
    });
  }

  private doCreateUser() {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "User Name",
        email: "lol@example.com",
        providerName: "jennalilley",
        providerId: 123
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + Cookies.get("TOKEN")
      }
    }).then((response:Response) => {
      console.log("new user", response);
    })
  }

  private doUsers() {
    fetch("/api/users", {
      headers: {
        "Authorization": "JWT " + Cookies.get("TOKEN")
      }
    }).then((response:Response) => {
      console.log("users response", response);
    });
  }

  private doUserById() {
    fetch("/api/users/" + this.state.userId, {
      headers: {
        "Authorization": "JWT " + Cookies.get("TOKEN")
      }
    }).then((response:Response) => {
      console.log("user id response", response);
    });
  }

  private doInsecure() {
    fetch("/api/insecure").then((response:Response) => {
      console.log("insecure response", response);
    });
  }

  private doSecure() {
    fetch("/api/secure", {
      headers: {
        "Authorization": "JWT " + Cookies.get("TOKEN")
      }
    }).then((response:Response) => {
      console.log("secure response", response);
    });
  }

  public render() {
    return (
      <div className={this.demoClassName}>
        <a href="http://localhost:8080/api/auth/facebook/start">Login with Facebook</a>
        <a href="http://localhost:8080/api/auth/google/start">Login with Google</a>
        <button onClick={this.doInsecure}>Insecure</button>
        <button onClick={this.doSecure}>Secure</button>
        <button onClick={this.doUsers}>Users</button>
        <button onClick={this.doUserById}>User by ID</button>
        <button onClick={this.doDeleteById}>Delete by ID</button>
        <input onChange={(e) => {
          this.setState({
            userId: e.target.value
          });
        }} defaultValue={this.state.userId} />

        <button onClick={this.doCreateUser}>Create User</button>

        <hr/>

        <UserList/>

        <hr/>

        <ScheduleForm />

        <hr />

        <ScheduleList />
      </div>
    );
  }
}
