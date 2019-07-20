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

                <h2>{this.state.name}</h2>
                
                <div className="schedule-page">

                    <table className="schedule-table">
                        <thead>
                            <tr>
                                <th>Event Type</th>
                                <th>Start Date/Time</th>
                                <th>End Date/Time</th>
                                <th>Capacity</th>
                                <th>Age Restrictions</th>
                                <th>Cost</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.type}</td>
                                <td>{this.state.startDateTime ? new Date(this.state.startDateTime).toLocaleString() : ""}</td>
                                <td>{this.state.endDateTime ? new Date(this.state.endDateTime).toLocaleString() : ""}</td>
                                <td>{this.state.capacity}</td>
                                <td>{this.state.ageRestrictions}</td>
                                <td>{this.state.cost}</td>
                                <td>{this.state.location}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div dangerouslySetInnerHTML={{
                        __html: this.state.description
                    }}/>
                </div>
            </div>
        );
    }
}
