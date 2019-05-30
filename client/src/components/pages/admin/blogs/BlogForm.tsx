import React, { FormEvent, RefObject } from 'react';
import DatePicker from "react-datepicker";
import ReactDatePicker from 'react-datepicker';
import {style} from "typestyle";
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';
import { MODE } from '../../../../util/TypeUtils';
import { BlogFormProps, BlogFormState } from '../../../states/Blogs';

export default class BlogForm extends React.Component<BlogFormProps, BlogFormState> {
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
  
  constructor(props:BlogFormProps) {
    super(props);

    this.state = {
        content: "",
        title: "",
        startDateTime: null,
        endDateTime: null,
        message: {
            message: "",
            type: ""
        }
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

    if(this.props.mode === MODE.CREATE) {
        this.createBlog(payload);
        return;
    }

    if(this.props.mode === MODE.EDIT) {
        this.editBlog(payload, this.props.id);
        return;
    }
  }

  private editBlog(payload:any, id:string) {
    HttpService.put("/api/blogs/" + id, payload).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "Blog updated."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to save blog."
            }
        });
    });
  }

  private createBlog(payload:any) {
    HttpService.post("/api/blogs", payload).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "About section updated."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to save content."
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
                    <textarea defaultValue="ggg" ref={this.contentRef} />
                </label>

                <button>Save Blog</button>
            </form>
        </div>
    );
  }
}
