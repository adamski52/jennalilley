import React from 'react';
import { Link } from 'react-router-dom';
import { ScheduleViewAllState, ScheduleViewAllProps } from '../../../states/Schedule';
import { ISchedule } from '../../../interfaces/Schedule';
import ScheduleService from '../../../services/ScheduleService';

export default class SchedulePage extends React.Component<ScheduleViewAllProps, ScheduleViewAllState> {
    constructor(props: ScheduleViewAllProps) {
        super(props);

        this.state = {
            authentication: props.authentication,
            items: []
        };
    }

    public componentDidMount() {
        this.onFetch();
    }

    private async onFetch() {
        try {
            let json = await ScheduleService.readAllActive(this.props.setGlobalMessage);
            this.setState({
                items: json as ISchedule[]
            });
        }
        catch(e) {
            this.setState({
                items: []
            });
        }
    }

    private renderItems() {
        if(this.state.items.length <= 0) {
            return (
                <div className="note">
                    <p>There are no upcoming events currently scheduled.</p>
                </div>
            );
        }

        return this.state.items.map((schedule: ISchedule) => {
            return this.renderItem(schedule);
        });
    }

    private renderItem(item:ISchedule) {
        return (
            <div>
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
            <div>
                <h2>Upcoming Events</h2>
                
                {this.renderItems()}
            </div>
        );
    }
}
