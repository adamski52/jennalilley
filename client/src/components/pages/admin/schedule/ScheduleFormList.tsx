import React from 'react';
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';
import { Link } from 'react-router-dom';
import { ScheduleFormProps } from '../../../states/Schedule';

export default class ScheduleFormList extends React.Component<ScheduleFormProps, any> {
  constructor(props:ScheduleFormProps) {
    super(props);

    this.state = {
        events: []
    };

    this.onDelete = this.onDelete.bind(this);

    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/schedule").then((json) => {
        this.setState({
            events: json
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

  private onDelete(event:any) {
    return (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        HttpService.delete("/api/schedule/" + event._id).then(() => {
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

  private renderItem(event:any) {
      return (
        <div className="row" key={event._id}>
            <div className="col-xs-6">
                <Link to={"/admin/schedule/edit/" + event._id}>{event.name}</Link>
            </div>
            <div className="col-xs-2">
                {event.type}
            </div>
            <div className="col-xs-2">
                {event.startDateTime}
            </div>
            <div className="col-xs-2">
                {event.endDateTime}
            </div>
            <div className="col-xs-2">
                {event.capacity}
            </div>
            <div className="col-xs-2">
                {event.ageRestrictions}
            </div>
            <div className="col-xs-2">
                {event.cost}
            </div>
            <div className="col-xs-2">
                {event.location}
            </div>
            <div className="col-xs-2">
                <button onClick={this.onDelete(event)}>Delete</button>
            </div>
        </div>
      );
  }

  private renderItems() {
      return this.state.events.map((blog:any) => {
          return this.renderItem(blog);
      });
  }

  public render() {
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
