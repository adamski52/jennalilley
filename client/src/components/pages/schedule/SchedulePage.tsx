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
            let items = json || [],
                today = new Date();

            items = items.filter((item) => {
                return item.startDateTime && item.startDateTime < today;
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
        if(this.state.items.length <= 0) {
            return (
                <p className="note">There are no upcoming events currently scheduled.</p>
            );
        }

        return this.state.items.map((schedule: ISchedule) => {
            return this.renderItem(schedule);
        });
    }

    private renderItem(item:ISchedule) {
        return (
            <div className="schedule-item">
                <Link to={"/schedule/" + item._id}>{item.name}</Link>
                <p><strong>Event Type:</strong> {item.type}</p>
                <p><strong>Start Date:</strong> {item.startDateTime ? new Date(item.startDateTime).toLocaleString() : ""}</p>
                <p><strong>End Date:</strong> {item.endDateTime ? new Date(item.endDateTime).toLocaleString() : ""}</p>
                <p><strong>Capacity:</strong> {item.capacity}</p>
                <p><strong>Age Restrictions:</strong> {item.ageRestrictions}</p>
                <p><strong>Cost:</strong> {item.cost}</p>
                <p><strong>Location:</strong> {item.location}</p>
            </div>
        );
    }
    
    public render() {
        return (
            <div className="main-content">
                <StatusBar {...this.state.message} />

                <h2>Upcoming Events</h2>
                
                {this.renderItems()}
            </div>
        );
    }
}
