import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import {style} from "typestyle";

export default class Calendar extends React.Component<any, any> {
  private localizer = BigCalendar.momentLocalizer(moment);
  
  constructor(props:any) {
    super(props);
    this.state = {
        events: [{
            start: new Date(),
            end: moment().add(1, "days"),
            title: "Some title"
        }]
    };
  }

  private calendarClassName = style({
      height: "75vh"
  });

  public render() {
    return (
        <div>
            <BigCalendar
                localizer={this.localizer}
                events={this.state.events}
                defaultDate={new Date()}
                defaultView="month"
                className={this.calendarClassName}
            />
        </div>
    );
  }
}
