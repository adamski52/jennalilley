import React, {MouseEvent} from 'react';
import UserService from '../../../services/UserService';
import { UserViewAllProps, UserViewAllState } from '../../../states/User';
import { IUser } from '../../../interfaces/User';
import BaseAdminPage from '../BaseAdminPage';
import DeleteButton from '../../buttons/DeleteButton';

export default class UserFormList extends BaseAdminPage<UserViewAllProps, UserViewAllState> {
    constructor(props: UserViewAllProps) {
        super(props);

        this.state = {
            authentication: props.authentication,
            items: []
        };

        this.onDelete = this.onDelete.bind(this);
    }

    public componentDidMount() {
        this.onFetch();
    }

    private async onFetch() {
        let json = await UserService.readAll(this.props.setGlobalMessage);
        this.setState({
            items: json
        });
    }

    private async onPromote(user: IUser) {
        if (!window.confirm("Granting a user admin rights will give them full control of this site's admin area, including the ability to revoke your admin rights.\n\nAre you sure you want to do this?")) {
            return;
        }

        if (!window.confirm("Good lord, you're really sure?")) {
            return;
        }

        await UserService.promote(this.props.setGlobalMessage, user);
        return this.onFetch();
    }

    private async onDemote(user: IUser) {
        if (!window.confirm("Revoking a user's admin rights will make them unable to access the admin area.\n\nAre you sure you want to do this?")) {
            return;
        }

        await UserService.demote(this.props.setGlobalMessage, user);
        this.onFetch();
    }

    private onDelete(user: IUser) {
        return async (e:MouseEvent<HTMLButtonElement>) => {
            if (!window.confirm("Deleting a user will break any connections they have to this site.\n\nThey will have to re-create their account from scratch.\n\nAre you sure you want to do this?")) {
                return;
            }

            await UserService.delete(this.props.setGlobalMessage, user._id);
            this.onFetch();
        };
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
            <div key={item._id}>
                <p>{item.name}</p>
                <p>{item.email}</p>
                {this.getProviderDetails(item)}
                {this.renderRoles(item)}
                {this.getRoleButton(item)}
                <DeleteButton onClick={this.onDelete(item)} authentication={this.props.authentication} />
            </div>
        );
    }

    private renderItems() {
        return this.state.items.map((item: IUser) => {
            return this.renderItem(item);
        });
    }

    public render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}
