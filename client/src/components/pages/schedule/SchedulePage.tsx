import React from 'react';
import StatusBar, { STATUS } from '../../StatusBar';
import HttpService from '../../../util/HttpService';
import { Link } from 'react-router-dom';
// import Calendar from './Calendar';
import { ScheduleViewAllState, ScheduleViewAllProps } from '../../states/Schedule';
import { ISchedule } from '../../../interfaces/Schedule';

export default class SchedulePage extends React.Component<ScheduleViewAllProps, ScheduleViewAllState> {
    constructor(props: ScheduleViewAllProps) {
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
    }

    public componentDidMount() {
        this.onFetch();
    }

    private onFetch() {
        HttpService.get("/api/schedule").then((json:ISchedule[]) => {
            let items = json || [];
            items = items.sort((lhs:ISchedule, rhs:ISchedule) => {
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
                items: items
            });
        }).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to fetch events."
                }
            });
        });
    }

    private renderItems() {
        return (
            <div className="schedule-page">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Type</th>
                            <th>Start Date/Time</th>
                            <th>End Date/Time</th>
                            <th>Capacity</th>
                            <th>Age Restrictions</th>
                            <th>Cost</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.items.map((schedule: ISchedule) => {
                            return this.renderItem(schedule);
                        })
                    }</tbody>
                </table>
            </div>
        );
    }

    private renderItem(item:ISchedule) {
        return (
            <tr>
                <td><Link to={"/schedule/" + item._id}>{item.name}</Link></td>
                <td>{item.type}</td>
                <td>{item.startDateTime ? new Date(item.startDateTime).toLocaleString() : ""}</td>
                <td>{item.endDateTime ? new Date(item.endDateTime).toLocaleString() : ""}</td>
                <td>{item.capacity}</td>
                <td>{item.ageRestrictions}</td>
                <td>{item.cost}</td>
                <td>{item.location}</td>
            </tr>
        );
    }

    // private renderCalendar() {
    //     return (
    //         <Calendar items={this.state.items} />
    //     );
    // }

    public render() {
        return (
            <div className="main-content">
                <StatusBar {...this.state.message} />

                {this.renderItems()}
            </div>
        );
    }
}
