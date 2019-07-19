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
                <div>
                    <div className="col-xs-2">
                        {this.state.name}
                    </div>
                    <div className="col-xs-2">
                        {this.state.type}
                    </div>
                    <div className="col-xs-2">
                        {this.state.startDateTime}
                    </div>
                    <div className="col-xs-2">
                        {this.state.endDateTime}
                    </div>
                    <div className="col-xs-2">
                        {this.state.capacity}
                    </div>
                    <div className="col-xs-2">
                        {this.state.ageRestrictions}
                    </div>
                    <div className="col-xs-2">
                        {this.state.cost}
                    </div>
                    <div className="col-xs-2">
                        {this.state.location}
                    </div>
                    <div dangerouslySetInnerHTML={{
                        __html: this.state.description
                    }}/>
                </div>
            </div>
        );
    }
}
