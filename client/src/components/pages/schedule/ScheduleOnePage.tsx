import React from 'react';
import StatusBar, { STATUS } from '../../StatusBar';
import HttpService from '../../../util/HttpService';
import { ScheduleViewOneState, ScheduleViewOneProps } from '../../states/Schedule';

export default class ScheduleOnePage extends React.Component<ScheduleViewOneProps, ScheduleViewOneState> {
    constructor(props: ScheduleViewOneProps) {
        super(props);

        this.state = {
            isAuthenticated: !!props.isAuthenticated,
            isAdmin: !!props.isAdmin,
            name: "",
            type: "",
            startDateTime: null,
            endDateTime: null,
            capacity: "",
            ageRestrictions: "",
            cost: "",
            location: "",
            description: "",
            message: {
                message: "",
                type: ""
            }
        };
    }

    public componentDidMount() {
        this.onFetch();
    }
    
    private onFetch() {
        if(!this.props.match.params || !this.props.match.params.id) {
            return;
        }
        
        HttpService.get("/api/schedule/" + this.props.match.params.id).then((json:any) => {
            this.setState({
                name: json.name,
                type: json.type,
                startDateTime: json.startDateTime ? new Date(json.startDateTime) : null,
                endDateTime: json.endDateTime ? new Date(json.endDateTime) : null,
                capacity: json.capacity,
                ageRestrictions: json.ageRestrictions,
                cost: json.cost,
                location: json.location,
                description: json.description,
                message: {
                    message: "",
                    type: ""
                }
            });
        }).catch(() => {
            this.setState({
                message: {
                    message: "Failed to load event.",
                    type: STATUS.ERROR
                }
            });
        });
    }
    
    public render() {
        return (
            <div className="main-content">
                
                <StatusBar {...this.state.message} />

                <h2>Upcoming Events</h2>

                <div className="schedule-item">
                    <h3>{this.state.name}</h3>

                    <p><strong>Event Type:</strong> {this.state.type}</p>
                    <p><strong>Start Date:</strong> {this.state.startDateTime ? new Date(this.state.startDateTime).toLocaleString() : ""}</p>
                    <p><strong>End Date:</strong> {this.state.endDateTime ? new Date(this.state.endDateTime).toLocaleString() : ""}</p>
                    <p><strong>Capacity:</strong> {this.state.capacity}</p>
                    <p><strong>Age Restrictions:</strong> {this.state.ageRestrictions}</p>
                    <p><strong>Cost:</strong> {this.state.cost}</p>
                    <p><strong>Location:</strong> {this.state.location}</p>

                    <div dangerouslySetInnerHTML={{
                        __html: this.state.description
                    }}/>
                </div>
            </div>
        );
    }
}
