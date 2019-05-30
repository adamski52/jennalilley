import React, { FormEvent, RefObject } from 'react';
import DatePicker from "react-datepicker";
import {style} from "typestyle";
import ReactDatePicker from 'react-datepicker';
import Cookies from 'js-cookie';

export default class ScheduleForm extends React.Component<any, any> {

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

  private nameRef = React.createRef<HTMLInputElement>();
  private typeRef = React.createRef<HTMLInputElement>();
  private startDateTimeRef = React.createRef<ReactDatePicker>();
  private endDateTimeRef = React.createRef<ReactDatePicker>();
  private capacityRef = React.createRef<HTMLInputElement>();
  private ageRestrictionsRef = React.createRef<HTMLInputElement>();
  private costRef = React.createRef<HTMLInputElement>();
  private locationRef = React.createRef<HTMLInputElement>();
  private descriptionRef = React.createRef<HTMLTextAreaElement>();
  
  constructor(props:any) {
    super(props);

    this.state = {
        startDateTime: null,
        endDateTime: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  private refOrValue(ref:RefObject<HTMLInputElement | HTMLTextAreaElement | null>, val:string) {
    return ref.current ? ref.current.value : val;
  }

  private onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let payload = {
        name: this.refOrValue(this.nameRef, ""),
        type: this.refOrValue(this.typeRef, ""),
        startDateTime: this.state.startDateTime || "",
        endDateTime: this.state.endDateTime || "",
        capacity: this.refOrValue(this.capacityRef, ""),
        ageRestrictions: this.refOrValue(this.ageRestrictionsRef, ""),
        cost: this.refOrValue(this.costRef, ""),
        location: this.refOrValue(this.locationRef, ""),
        description: this.refOrValue(this.descriptionRef, "")
    };

    fetch("/api/schedules", {
        method: "POST",
        headers: {
            "Authorization": "JWT " + Cookies.get("TOKEN"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then((response:Response) => {
        return response.json();
    }).then((schedule) => {
        console.log("created item", schedule);
    }).catch((e) => {
        console.log("oh no", e);
    });
  }

  public render() {
    return (
        <div>
            <form onSubmit={this.onSubmit}>
                <label>
                    <span>Event Name</span>
                    <input defaultValue="aaa" type="text" ref={this.nameRef} placeholder="Event Name" />
                </label>

                <label>
                    <span>Event Type (e.g. Hitting, Fielding, etc.)</span>
                    <input  defaultValue="bbb" type="text" ref={this.typeRef} placeholder="Event Type" />
                </label>

                <label className={this.timeClassName}>
                    <span>Start Date</span>
                    <DatePicker
                        ref={this.startDateTimeRef}
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
                        ref={this.endDateTimeRef}
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
                    <input  defaultValue="ccc" type="text" ref={this.capacityRef} placeholder="Capacity" />
                </label>

                <label>
                    <span>Age Restrictions (e.g. 10+, none, etc.)</span>
                    <input  defaultValue="ddd" type="text" ref={this.ageRestrictionsRef} placeholder="Age Restrictions (e.g. 10+, none, etc.)" />
                </label>

                <label>
                    <span>Cost (e.g. $100/person, $100/group, etc.)</span>
                    <input  defaultValue="eee" type="text" ref={this.costRef} placeholder="Cost (e.g. $100/person, $100/group, etc.)" />
                </label>

                <label>
                    <span>Location</span>
                    <input  defaultValue="fff" type="text" ref={this.locationRef} placeholder="Location" />
                </label>

                <label>
                    <span>Description</span>
                    <textarea  defaultValue="ggg" ref={this.descriptionRef} />
                </label>

                <button>Save Event</button>
            </form>
        </div>
    );
  }
}
