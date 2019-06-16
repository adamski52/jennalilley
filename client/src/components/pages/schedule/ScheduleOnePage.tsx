import React from 'react';
import StatusBar, { STATUS } from '../../StatusBar';
import HttpService from '../../../util/HttpService';

export default class ScheduleOnePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: "",
            type: "",
            startDateTime: "",
            endDateTime: "",
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
        
        HttpService.get("/api/schedule/" + this.props.match.params.id).then((json) => {
            this.setState({
                name: json.name,
                type: json.type,
                startDateTime: json.startDateTime ? new Date(json.startDateTime).toString() : "",
                endDateTime: json.endDateTime ? new Date(json.endDateTime).toString() : "",
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
            <div>
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
                        __html: this.state.desription
                    }}/>
                </div>
            </div>
        );
    }
}
