import React from 'react';
import fetch from "cross-fetch";
import Cookies from 'js-cookie';
import { ISchedule } from "../../../server/src/models/Schedule";

export default class ScheduleList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
        schedules: []
    };

    fetch("/api/schedules", {
        headers: {
            "Authorization": "JWT " + Cookies.get("TOKEN")
        }
    }).then((response:Response) => {
        return response.json();
    }).then((schedules) => {
        console.log("got schedules", schedules);
        this.setState({
            schedules: schedules || []
        });
    });
  }

  private onDelete(schedule:ISchedule) {
    fetch("/api/schedules/" + schedule._id, {
        method: "DELETE",
        headers: {
          "Authorization": "JWT " + Cookies.get("TOKEN")
        }
      }).then((response:Response) => {
        console.log("delete by id", response);
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
      console.log(this.state);
      return this.state.schedules.map((schedule:ISchedule) => {
        return this.renderItem(schedule);
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
