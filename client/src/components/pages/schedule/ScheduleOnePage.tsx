import React, { MouseEvent } from 'react';
import { ScheduleViewOneState, ScheduleViewOneProps } from '../../../states/Schedule';
import Button from '../../buttons/BaseButton';
import ScheduleService from '../../../services/ScheduleService';
import { ISchedule } from '../../../interfaces/Schedule';

export default class ScheduleOnePage extends React.Component<ScheduleViewOneProps, ScheduleViewOneState> {
    constructor(props: ScheduleViewOneProps) {
        super(props);

        this.state = {
            authentication: props.authentication,
            name: "",
            type: "",
            startDateTime: null,
            endDateTime: null,
            capacity: "",
            isFull: false,
            ageRestrictions: "",
            cost: "",
            location: "",
            description: ""
        };

        this.onEnroll = this.onEnroll.bind(this);
        this.onDisenroll = this.onDisenroll.bind(this);
        this.onFull = this.onFull.bind(this);
    }

    public componentDidMount() {
        this.onFetch();
    }
    
    private async onFetch() {
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }

        try {
            let json:ISchedule = await ScheduleService.readOne(this.props.setGlobalMessage, this.props.match.params.id);
            this.setState({
                name: json.name,
                type: json.type,
                startDateTime: json.startDateTime ? new Date(json.startDateTime) : null,
                endDateTime: json.endDateTime ? new Date(json.endDateTime) : null,
                capacity: json.capacity,
                ageRestrictions: json.ageRestrictions,
                cost: json.cost,
                isFull: !!json.isFull,
                location: json.location,
                description: json.description
            });
        }
        catch(e) {
            this.setState({
                name: "",
                type: "",
                startDateTime: null,
                endDateTime: null,
                capacity: "",
                isFull: false,
                ageRestrictions: "",
                cost: "",
                location: "",
                description: ""
            });
        }
    }

    private isFull() {
        return !!this.state.isFull;
    }

    // TODO: this
    private isEnrolled() {
        return false;
    }

    private onFull(e:MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.props.setModalMessage("Course is Full", "Unfortunately the course selected course is full.  Please select a different course or feel free to contact me for special considerations.");
    }

    private onEnroll(e:MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.props.setModalMessage("Confirm Enrollment", "Are you sure you wish to enroll in the selected course?");
    }

    private onDisenroll(e:MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.props.setModalMessage("Confirm Disenrollment", "Are you sure you wish to unenroll in the selected course?  The ability to re-enroll is not guarnteed.");
    }

    private renderActionButton() {
        if(this.isFull()) {
            return (
                <Button className="btn btn-status-error icon-times" onClick={this.onFull} label="Course Full" />
            );
        }

        if(this.isEnrolled()) {
            return (
                <Button className="btn btn-status-warn icon-sign-in" onClick={this.onEnroll} label="Enroll" />
            );
        }

        return (
            <Button className="btn btn-status-success icon-sign-out" onClick={this.onDisenroll} label="Disenroll" />
        );
    }

    
    public render() {
        return (
            <div>
                <h2>Upcoming Events</h2>

                <div>
                    <h3>{this.state.name}</h3>

                    <p>Event Type: {this.state.type}</p>
                    <p>Start Date: {this.state.startDateTime ? new Date(this.state.startDateTime).toLocaleString() : ""}</p>
                    <p>End Date: {this.state.endDateTime ? new Date(this.state.endDateTime).toLocaleString() : ""}</p>
                    <p>Capacity: {this.state.capacity}</p>
                    <p>Age Restrictions: {this.state.ageRestrictions}</p>
                    <p>Cost: {this.state.cost}</p>
                    <p>Location: {this.state.location}</p>

                    <div dangerouslySetInnerHTML={{
                        __html: this.state.description
                    }}/>

                    {this.renderActionButton()}
                </div>
            </div>
        );
    }
}
