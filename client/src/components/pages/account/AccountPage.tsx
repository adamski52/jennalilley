import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';
import { AccountViewProps,  AccountViewState } from '../../states/Account';
import { ISchedule } from '../../../interfaces/Schedule';
import BaseSecurePage from '../../admin/BaseSecurePage';

export default class AccountPage extends BaseSecurePage<AccountViewProps, AccountViewState> {
    constructor(props:AccountViewProps) {
        super(props);

        this.state = {
            isAuthenticated: !!props.isAuthenticated,
            isAdmin: !!props.isAdmin,
            message: {
                message: "",
                type: ""
            },
            events: []
        };

        this.onDisenroll = this.onDisenroll.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/account").then((json) => {
        let events = json.events || [],
            today = new Date();

        events = events.filter((event:ISchedule) => {
            return event.startDateTime && event.startDateTime < today;
        }).sort((lhs:ISchedule, rhs:ISchedule) => {
            if(lhs.startDateTime != null && rhs.startDateTime != null) {
                if(lhs.startDateTime < rhs.startDateTime) {
                    return -1;
                }

                if(lhs.startDateTime > rhs.startDateTime) {
                    return 1;
                }
            }

            return 0;
        });

        this.setState({
            events: events
        });
    }).catch((e) => {
        this.setState({
            message: {
                message: "Failed to load events.",
                type: STATUS.ERROR
            }
        });
    });
  }

  private onDisenroll(e:MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.setState({
            modal: {
                title: "Confirm Disenrollment",
                message: "Are you sure you wish to unenroll in the selected course?  The ability to re-enroll is not guarnteed."
            }
        });
    }

    private onCloseModal(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            modal: undefined
        });
    }

  private renderModal() {
    if(!this.state.modal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <p className="text-large">{this.state.modal.title}</p>
                <p>{this.state.modal.message}</p>
                <div className="modal-buttons text-right">
                    <button onClick={this.onCloseModal} className="btn btn-status-warn icon-check">OK</button>
                </div>
            </div>
        </div>
    );
}

  private renderItem(item:any) {
      return (
        <div className="row" key={item._id}>
            <div className="col-xs-6">
                <Link className="btn btn-admin icon-calendar" to={"/schedule/" + item._id}>{item.name}</Link>
            </div>
            <div className="col-xs-2">
                {item.type}
            </div>
            <div className="col-xs-2">
                {item.startDateTime}
            </div>
            <div className="col-xs-2">
                {item.endDateTime}
            </div>
            <div className="col-xs-2">
                {item.cost}
            </div>
            <div className="col-xs-2">
                {item.location}
            </div>
            <div className="col-xs-2">
                <button className="btn btn-status-success icon-sign-out" onClick={this.onDisenroll}>Disenroll</button>
            </div>
        </div>
      );
  }

  private renderItems() {
      return this.state.items.map((item:ISchedule) => {
          return this.renderItem(item);
      });
  }

  protected renderAuthenticatedView() {
    return (
        <div className="main-content">
            <StatusBar {...this.state.message} />
            <h2>My Upcoming Events</h2>
            {this.renderItems()}
            {this.renderModal()}
        </div>
    );
  }
}
