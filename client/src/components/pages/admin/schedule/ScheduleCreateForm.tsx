import React, { FormEvent } from 'react';
import DatePicker from "react-datepicker";
import {style} from "typestyle";
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';
import RefUtil from '../../../../util/RefUtil';
import { ScheduleFormProps, ScheduleFormState } from '../../../states/Schedule';
import ReactQuill from 'react-quill';
import { RTF_MODULES } from '../../../../util/EditorUtils';

export default class ScheduleCreateForm extends React.Component<ScheduleFormProps, ScheduleFormState> {
  private nameRef = React.createRef<HTMLInputElement>();
  private typeRef = React.createRef<HTMLInputElement>();
  private capacityRef = React.createRef<HTMLInputElement>();
  private ageRestrictionsRef = React.createRef<HTMLInputElement>();
  private costRef = React.createRef<HTMLInputElement>();
  private locationRef = React.createRef<HTMLInputElement>();

  private timeClassName = style({
    "$nest": {
        ".react-datepicker__time-container": {
            "width": "100px"
        },
        ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box": {
            "width": "100%"
        },
        ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item": {
            "padding": "10px 0 0 0"
        },
        ".react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button)": {
            "right": "110px"
        }
    }
  });
  
  constructor(props:ScheduleFormProps) {
    super(props);

    this.state = {
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  private onChange(value:string) {
    this.setState({
        description: value
    });
  }

  private onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let payload = {
        name: RefUtil.getValue(this.nameRef, ""),
        type: RefUtil.getValue(this.typeRef, ""),
        startDateTime: this.state.startDateTime,
        endDateTime: this.state.endDateTime,
        capacity: RefUtil.getValue(this.capacityRef, ""),
        ageRestrictions: RefUtil.getValue(this.ageRestrictionsRef, ""),
        cost: RefUtil.getValue(this.costRef, ""),
        location: RefUtil.getValue(this.locationRef, ""),
        description: this.state.description
    };

    HttpService.post("/api/schedule", payload).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "Event created."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to create event."
            }
        });
    });
  }

  public render() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            <form onSubmit={this.onSubmit}>
                <label>
                    <span>Event Name</span>
                    <input defaultValue={this.state.name} type="text" ref={this.nameRef} placeholder="Event Name" />
                </label>

                <label>
                    <span>Event Type (e.g. Hitting, Fielding, etc.)</span>
                    <input defaultValue={this.state.type} type="text" ref={this.typeRef} placeholder="Event Type" />
                </label>

                <label className={this.timeClassName}>
                    <span>Start Date</span>
                    <DatePicker
                        showTimeSelect
                        timeIntervals={15}
                        minDate={new Date()}
                        placeholderText="Start Date"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Start Time"
                        selected={this.state.startDateTime}
                        onChange={(date) => {
                            this.setState({
                                startDateTime: date
                            });
                        }}
                    />
                </label>

                <label className={this.timeClassName}>
                    <span>End Date</span>
                    <DatePicker
                        showTimeSelect
                        timeIntervals={15}
                        minDate={this.state.startDateTime ? this.state.startDateTime : new Date()}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="End Time"
                        placeholderText="End Date"
                        selected={this.state.endDateTime}
                        onChange={(date) => {
                            this.setState({
                                endDateTime: date
                            });
                        }}
                    />
                </label>

                <label>
                    <span>Capacity</span>
                    <input defaultValue={this.state.capacity} type="text" ref={this.capacityRef} placeholder="Capacity" />
                </label>

                <label>
                    <span>Age Restrictions (e.g. 10+, none, etc.)</span>
                    <input defaultValue={this.state.ageRestrictions} type="text" ref={this.ageRestrictionsRef} placeholder="Age Restrictions (e.g. 10+, none, etc.)" />
                </label>

                <label>
                    <span>Cost (e.g. $100/person, $100/group, etc.)</span>
                    <input defaultValue={this.state.cost} type="text" ref={this.costRef} placeholder="Cost (e.g. $100/person, $100/group, etc.)" />
                </label>

                <label>
                    <span>Location</span>
                    <input defaultValue={this.state.location} type="text" ref={this.locationRef} placeholder="Location" />
                </label>

                <label>
                    <span>Content</span>
                    <ReactQuill modules={RTF_MODULES} value={this.state.description} onChange={this.onChange}/>
                </label>

                <button>Save Event</button>
            </form>
        </div>
    );
  }
}
