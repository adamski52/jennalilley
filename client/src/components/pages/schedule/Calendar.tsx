import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React, { SyntheticEvent } from 'react';
import { withRouter } from 'react-router';
import { ISchedule } from '../../../interfaces/Schedule';

class Calendar extends React.Component<any, any> {
  private localizer = BigCalendar.momentLocalizer(moment);
  
  constructor(props:any) {
    super(props);

    this.state = {
        items: this.getItems(props.items || [])
    };

    this.onSelectEvent = this.onSelectEvent.bind(this);
  }

  public componentWillReceiveProps(props:any) {
    this.setState({
      items: this.getItems(props.items || [])
    });
  }

  private getItems(items:ISchedule[]) {
    return items.map((item:ISchedule) => {
      return {
        start: item.startDateTime,
        end: item.endDateTime,
        title: item.name,
        id: item._id
      };
    });
  }

  // private calendarClassName = style({
  //     height: "75vh"
  // });

  private onSelectEvent(item: any, e: SyntheticEvent<HTMLElement, Event>) {
    this.props.history.push("/schedule/" + item.id);
  }

  public render() {
    return (
        <div>
            <BigCalendar
                localizer={this.localizer}
                events={this.state.items}
                defaultDate={new Date()}
                defaultView="month"
                className=""
                onSelectEvent={this.onSelectEvent}
            />
        </div>
    );
  }
}

export default withRouter(Calendar);

