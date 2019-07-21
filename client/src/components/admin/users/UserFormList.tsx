import React from 'react';
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';
import BaseSecurePage from '../BaseSecurePage';
import { UserViewAllProps, UserViewAllState } from '../../states/User';
import { IUser } from '../../../interfaces/User';
import { Link } from "react-router-dom";

export default class UserFormList extends BaseSecurePage<UserViewAllProps, UserViewAllState> {
    constructor(props: UserViewAllProps) {
        super(props);

        this.state = {
            isAuthenticated: !!props.isAuthenticated,
            isAdmin: !!props.isAdmin,
            items: [],
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
        HttpService.get("/api/users").then((json) => {
            this.setState({
                items: json,
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

    private onPromote(user: IUser) {
        if (!window.confirm("Granting a user admin rights will give them full control of this site's admin area, including the ability to revoke your admin rights.\n\nAre you sure you want to do this?")) {
            return;
        }

        if (!window.confirm("Good lord, you're really sure?")) {
            return;
        }

        HttpService.put("/api/users/" + user._id + "/promote", user).then((response: Response) => {
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

    private onDemote(user: IUser) {
        if (!window.confirm("Revoking a user's admin rights will make them unable to access the admin area.\n\nAre you sure you want to do this?")) {
            return;
        }

        HttpService.put("/api/users/" + user._id + "/demote", user).then((response: Response) => {
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

    private onDelete(user: IUser) {
        if (!window.confirm("Deleting a user will break any connections they have to this site.\n\nThey will have to re-create their account from scratch.\n\nAre you sure you want to do this?")) {
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

    private getRoleButton(user: IUser) {
        let isAdmin = user.roles.find((role) => {
            return role.name.toUpperCase() === "ADMIN";
        });

        if (!isAdmin) {
            return (
                <button className="btn btn-status-warn icon-user-plus" onClick={(e) => {
                    return this.onPromote(user);
                }}>Promote</button>
            );
        }

        return (
            <button className="btn btn-status-warn icon-user-times" onClick={(e) => {
                return this.onDemote(user);
            }}>Demote</button>
        );
    }

    private getDeleteButton(user: IUser) {
        return (
            <button className="btn btn-status-error icon-trash" onClick={(e) => {
                return this.onDelete(user);
            }}>Delete</button>
        );
    }

    private renderRoles(user: IUser) {
        return user.roles.map((role) => {
            let classNames = ["role-badge"];
            if(role.name.toUpperCase() === "ADMIN") {
                classNames.push("role-badge-admin");
            }
            else if(role.name.toUpperCase() === "USER") {
                classNames.push("role-badge-user");
            }
            else {
                classNames.push("role-badge-unknown");
            }

            return (
                <div key={role._id} className={classNames.join(" ")}>{role.name}</div>
            );
        });
    }

    private getProviderDetails(user:IUser) {
        let classNames = ["btn"];

        if(user.providerName.toLowerCase() === "facebook") {
            classNames.push("btn-facebook icon-facebook");
        }
        else if(user.providerName.toLowerCase() === "google") {
            classNames.push("btn-google icon-google");
        }
        else {
            classNames.push("btn-unknown icon-question-circle");
        }

        return (
            <span className={classNames.join(" ")}>{user.providerId}</span>
        );
    }

    private renderItem(item: IUser) {
        return (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{this.getProviderDetails(item)}</td>
                <td>{item.email}</td>
                <td>{this.renderRoles(item)}</td>
                <td>
                    {this.getRoleButton(item)}
                    {this.getDeleteButton(item)}
                </td>
            </tr>
        );
    }

    private renderItems() {
        return this.state.items.map((item: IUser) => {
            return this.renderItem(item);
        });
    }

    public render() {
        return (
            <div className="main-content">
                <StatusBar {...this.state.message} />
                <div className="users-page">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Provider</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItems()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
