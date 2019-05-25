import React from 'react';
import fetch from "cross-fetch";
import Cookies from 'js-cookie';
import { IUser } from "../../../server/src/models/User";

export default class UserList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.state = {
      users: []
    };

    this.onDelete = this.onDelete.bind(this);

    fetch("/api/users", {
        headers: {
            "Authorization": "JWT " + Cookies.get("TOKEN")
        }
    }).then((response:Response) => {
        return response.json();
    }).then((users:IUser[]) => {
        this.setState({
            users: users
        });
    });
  }

  private onDelete(user:IUser) {
    fetch("/api/users/" + user._id, {
        method: "DELETE",
        headers: {
          "Authorization": "JWT " + Cookies.get("TOKEN")
        }
      }).then((response:Response) => {
        console.log("delete by id", response);
      });
  }

  private renderUser(user:IUser) {
      return (
        <div className="row">
             <div className="col-xs-3">
                {user.name}
            </div>
            <div className="col-xs-3">
                {user.providerId} : {user.providerName}<br/>
                {user._id}
            </div>
            <div className="col-xs-3">
                {user.email}
            </div>
            <div className="col-xs-3">
                <button onClick={(e) => {
                    return this.onDelete(user);
                }}>Delete</button>
            </div>
        </div>
      );
  }

  private renderUsers() {
      return this.state.users.map((user:IUser) => {
        return this.renderUser(user);
      });
  }

  public render() {
    return (
        <div>
          <ul>
              {this.renderUsers()}
          </ul>
        </div>
    );
  }
}
