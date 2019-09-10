import React, { MouseEvent } from 'react';
import AccountService from '../../../services/AccountService';
import { AccountViewProps, AccountViewState } from '../../../states/Account';
import { ISchedule } from '../../../interfaces/Schedule';
import BaseSecurePage from '../../admin/BaseSecurePage';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

export default class AccountPage extends BaseSecurePage<AccountViewProps, AccountViewState> {
    constructor(props: AccountViewProps) {
        super(props);

        this.state = {
            authentication: props.authentication,
            events: []
        };

        this.onDisenroll = this.onDisenroll.bind(this);
    }

    public componentDidMount() {
        this.onFetch();
    }

    private async onFetch() {
        try {
            let json = await AccountService.readAll(this.props.setGlobalMessage);
            this.setState({
                events: json
            });
        }
        catch(e) {
            this.setState({
                events: []
            });
        }
    }

    private onDisenroll(e: MouseEvent<HTMLSpanElement>) {
        e.preventDefault();
        this.props.setModalMessage("Confirm Disenrollment", "Are you sure you wish to unenroll in the selected course?  The ability to re-enroll is not guarnteed.");
    }

    private renderItem(item: any) {
        return (
            <div key={item._id}>
                <EditButton to={"/schedule/" + item._id} label={item.name} />
                {item.type}
                {item.startDateTime}
                {item.endDateTime}
                {item.cost}
                {item.location}
                <DeleteButton onClick={this.onDisenroll} label={"Disenroll"} />
            </div>
        );
    }

    private renderItems() {
        return this.state.events.map((item: ISchedule) => {
            return this.renderItem(item);
        });
    }

    protected renderAuthenticatedView() {
        return (
            <div>
                <h2>My Upcoming Events</h2>
                {this.renderItems()}
            </div>
        );
    }
}
