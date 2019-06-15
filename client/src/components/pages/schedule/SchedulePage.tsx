import React from 'react';
import { ISchedule } from "../../../../../server/src/models/Schedule";
import StatusBar, { STATUS } from '../../StatusBar';
import HttpService from '../../../util/HttpService';
import { Link } from 'react-router-dom';

export default class SchedulePage extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
        schedules: []
    };

    HttpService.get("/api/schedule").then((schedules) => {
        this.setState({
            schedules: schedules || []
        });
    }).catch(() => {
      this.setState({
          message: {
              type: STATUS.ERROR,
              message: "Failed to fetch schedule."
          }
      });
    });
  }

  private onDelete(schedule:ISchedule) {
    HttpService.delete("/api/schedule/" + schedule._id).then(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Schedule deleted successfully."
            }
        });      
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to delete schedule."
            }
        });
    });
  }

  private renderItem(event:ISchedule) {
      return (
        <div className="row" key={event._id}>
            <div className="col-xs-6">
                <Link to={"/schedule/" + event._id}>{event.name}</Link>
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
        </div>
      );
  }

  private renderItems() {
      return this.state.schedules.map((schedule:ISchedule) => {
        return this.renderItem(schedule);
      });
  }

  public render() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            {this.renderItems()}
        </div>
    );
  }
}
