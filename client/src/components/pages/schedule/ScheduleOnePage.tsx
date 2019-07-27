import React, { MouseEvent } from 'react';
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
            isFull: false,
            ageRestrictions: "",
            cost: "",
            location: "",
            description: "",
            message: {
                message: "",
                type: ""
            }
        };

        this.onEnroll = this.onEnroll.bind(this);
        this.onDisenroll = this.onDisenroll.bind(this);
        this.onFull = this.onFull.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
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
                isFull: json.isFull,
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

    private isFull() {
        return false;
    }

    private isEnrolled() {
        return false;
    }

    private onFull(e:MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.setState({
            modal: {
                title: "Course is Full",
                message: "Unfortunately the course selected course is full.  Please select a different course or feel free to contact me for special considerations."
            }
        });
    }

    private onEnroll(e:MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.setState({
            modal: {
                title: "Confirm Enrollment",
                message: "Are you sure you wish to enroll in the selected course?"
            }
        });
    }

    private onDisenroll(e:MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        this.setState({
            modal: {
                title: "Confirm Disenrollment",
                message: "Are you sure you wish to unenroll in the selected course?  The ability to re-enroll is not guarnteed."
            }
        });
    }

    private renderActionButton() {
        if(this.isFull()) {
            return (
                <span className="btn btn-status-error icon-times" onClick={this.onFull}>Course Full</span>
            );
        }

        if(this.isEnrolled()) {
            return (
                <button className="btn btn-status-warn icon-sign-in" onClick={this.onEnroll}>Enroll</button>
            );
        }

        return (
            <button className="btn btn-status-success icon-sign-out" onClick={this.onDisenroll}>Disenroll</button>
        );
    }

    private onCloseModal(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            modal: undefined
        });
    }

    private renderModal() {
        if(!this.state.modal) {
            return null;
        }

        return (
            <div className="modal">
                <div className="modal-content">
                    <p className="text-large">{this.state.modal.title}</p>
                    <p>{this.state.modal.message}</p>
                    <div className="modal-buttons text-right">
                        <button onClick={this.onCloseModal} className="btn btn-status-warn icon-check">OK</button>
                    </div>
                </div>
            </div>
        );
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

                    <div className="col-12 admin-buttons text-right">
                        {this.renderActionButton()}
                    </div>
                </div>

                {this.renderModal()}
            </div>
        );
    }
}
