import React from 'react';
import { IUser } from "../../../../../../server/src/models/User";
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';

export default class UserList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.state = {
      users: [],
      message: {
        message: "",
        type: ""
      }
    };

    this.onDelete = this.onDelete.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/users").then((users:IUser[]) => {
        this.setState({
            users: users,
            message: {
              message: "",
              type: ""
            }
        });
    }).catch(() => {
      this.setState({
        message: {
            message: "Failed to load users.",
            type: STATUS.ERROR
        }
      });
    });
  }

  private onPromote(user:IUser) {
    if(!window.confirm("Granting a user admin rights will give them full control of this site's admin area, including the ability to revoke your admin rights.\n\nAre you sure you want to do this?")) {
      return;
    }

    if(!window.confirm("Good lord, you're really sure?")) {
      return;
    }

    HttpService.put("/api/users/" + user._id + "/promote", user).then((response:Response) => {
      return this.onFetch();
    }).catch(() => {
      this.setState({
        message: {
            message: "Failed to promote user.",
            type: STATUS.ERROR
        }
      });
    });
  }

  private onDemote(user:IUser) {
    if(!window.confirm("Revoking a user's admin rights will make them unable to access the admin area.\n\nAre you sure you want to do this?")) {
      return;
    }

    HttpService.put("/api/users/" + user._id + "/demote", user).then((response:Response) => {
      return this.onFetch();
    }).catch(() => {
      this.setState({
        message: {
            message: "Failed to demote user.",
            type: STATUS.ERROR
        }
      });
    });
  }

  private onDelete(user:IUser) {
    if(!window.confirm("Deleting a user will break any connections they have to this site.\n\nThey will have to re-create their account from scratch.\n\nAre you sure you want to do this?")) {
      return;
    }

    HttpService.delete("/api/users/" + user._id).then(() => {
      return this.onFetch();
    }).catch(() => {
      this.setState({
        message: {
            message: "Failed to delete user.",
            type: STATUS.ERROR
        }
      });
    });
  }

  private getRoleButton(user:IUser) {
    let isAdmin = user.roles.find((role) => {
      return role.name === "ADMIN";
    });

    if(!isAdmin) {
      return (
        <button onClick={(e) => {
            return this.onPromote(user);
        }}>Promote to Admin</button>
      );
    }

    return (
      <button onClick={(e) => {
          return this.onDemote(user);
      }}>Revoke Admin Rights</button>
    );
  }

  private renderRoles(user:IUser) {
    return user.roles.map((role) => {
      return (
        <span key={role._id}>{role.name}</span>
      );
    });
  }

  private renderUser(user:IUser) {
      return (
        <div className="row">
             <div className="col-xs-2">
                {user.name}
            </div>
            <div className="col-xs-2">
                {user.providerId} : {user.providerName}<br/>
                {user._id}
            </div>
            <div className="col-xs-2">
                {user.email}
            </div>
            <div className="col-xs-2">
                {this.renderRoles(user)}
            </div>
            <div className="col-xs-2">
              {this.getRoleButton(user)}
            </div>
            <div className="col-xs-2">
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
          <StatusBar {...this.state.message} />
          <ul>
              {this.renderUsers()}
          </ul>
        </div>
    );
  }
}
