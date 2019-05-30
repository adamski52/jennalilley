import React from 'react';
import { ISchedule } from "../../../../../server/src/models/Schedule";
import StatusBar, { STATUS } from '../../StatusBar';
import HttpService from '../../../util/HttpService';

export default class ScheduleList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
        schedules: []
    };

    HttpService.get("/api/schedules").then((schedules) => {
        this.setState({
            schedules: schedules || []
        });
    }).catch(() => {
      this.setState({
          message: {
              type: STATUS.ERROR,
              message: "Failed to fetch blogs."
          }
      });
    });
  }

  private onDelete(schedule:ISchedule) {
    HttpService.delete("/api/schedules/" + schedule._id).then(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to fetch blogs."
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

  private renderItem(schedule:ISchedule) {
      return (
        <div key={schedule._id} className="row">
            <div className="col-xs-9">
                <p>{schedule.name}</p>
                <p>{schedule.type}</p>
                <p>{schedule.startDateTime}</p>
                <p>{schedule.endDateTime}</p>
                <p>{schedule.capacity}</p>
                <p>{schedule.ageRestrictions}</p>
                <p>{schedule.cost}</p>
                <p>{schedule.location}</p>
                <p>{schedule.description}</p>
            </div>
            <div className="col-xs-3">
                <button onClick={(e) => {
                    return this.onDelete(schedule);
                }}>Delete</button>
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
