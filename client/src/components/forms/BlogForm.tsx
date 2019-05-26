import React, { FormEvent, RefObject } from 'react';
import DatePicker from "react-datepicker";
import ReactDatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
import {style} from "typestyle";


export default class BlogForm extends React.Component<any, any> {
  private titleRef = React.createRef<HTMLInputElement>();
  private contentRef = React.createRef<HTMLTextAreaElement>();
  private startDateTimeRef = React.createRef<ReactDatePicker>();
  private endDateTimeRef = React.createRef<ReactDatePicker>();

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
        title: this.refOrValue(this.titleRef, ""),
        content: this.refOrValue(this.contentRef, "")
    };

    fetch("/api/blogs", {
        method: "POST",
        headers: {
            "Authorization": "JWT " + Cookies.get("TOKEN"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then((response:Response) => {
        return response.json();
    }).then((blog) => {
        console.log("created item", blog);
    }).catch((e) => {
        console.log("oh no", e);
    });
  }

  public render() {
    return (
        <div>
            <form onSubmit={this.onSubmit}>
                <label>
                    <span>Blog Title</span>
                    <input defaultValue="aaa" type="text" ref={this.titleRef} placeholder="Blog Title" />
                </label>

                <label className={this.timeClassName}>
                    <span>Publish Date</span>
                    <DatePicker
                        ref={this.startDateTimeRef}
                        showTimeSelect
                        timeIntervals={15}
                        minDate={new Date()}
                        placeholderText="Publish Date"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Publish Time"
                        selected={this.state.startDateTime}
                        onChange={(date) => {
                            this.setState({
                                startDateTime: date
                            });
                        }}
                    />
                </label>

                <label className={this.timeClassName}>
                    <span>Unpublish Date</span>
                    <DatePicker
                        ref={this.endDateTimeRef}
                        showTimeSelect
                        timeIntervals={15}
                        minDate={this.state.startDateTime ? this.state.startDateTime : new Date()}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Unpublish Time"
                        placeholderText="Unpublish Date"
                        selected={null}
                        onChange={(date) => {
                            this.setState({
                                endDateTime: date
                            });
                        }}
                    />
                </label>

                <label>
                    <span>Content</span>
                    <textarea  defaultValue="ggg" ref={this.contentRef} />
                </label>

                <button>Save Blog</button>
            </form>
        </div>
    );
  }
}
