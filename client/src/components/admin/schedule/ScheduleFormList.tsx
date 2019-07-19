import React from 'react';
import { Link } from 'react-router-dom';
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';
import { ScheduleFormProps, ScheduleViewAllState } from '../../states/Schedule';
import BaseSecurePage from '../BaseSecurePage';
import { ISchedule } from '../../../interfaces/Schedule';

export default class ScheduleFormList extends BaseSecurePage<ScheduleFormProps, ScheduleViewAllState> {
    constructor(props:ScheduleFormProps) {
    super(props);

    this.state = {
        isAuthenticated: !!props.isAuthenticated,
        isAdmin: !!props.isAdmin,
        message: {
            message: "",
            type: ""
        },
        items: []
    };

    this.onDelete = this.onDelete.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/schedule").then((json) => {
        this.setState({
            items: json
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

  private onDelete(item:ISchedule) {
    return (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        HttpService.delete("/api/schedule/" + item._id).then(() => {
            this.setState({
                message: {
                  type: STATUS.SUCCESS,
                  message: "Event deleted successfully."
                }
              });

            this.onFetch();
        }).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to delete event."
                }
            });
        });
    };
  }

  private renderItem(item:any) {
      return (
        <div className="row" key={item._id}>
            <div className="col-xs-6">
                <Link className="btn btn-admin icon-calendar" to={"/admin/schedule/edit/" + item._id}>{item.name}</Link>
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
                {item.capacity}
            </div>
            <div className="col-xs-2">
                {item.ageRestrictions}
            </div>
            <div className="col-xs-2">
                {item.cost}
            </div>
            <div className="col-xs-2">
                {item.location}
            </div>
            <div className="col-xs-2">
                <button onClick={this.onDelete(item)}>Delete</button>
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
        <div>
            <StatusBar {...this.state.message} />
            <div>
                {this.renderItems()}
            </div>
        </div>
    );
  }
}
