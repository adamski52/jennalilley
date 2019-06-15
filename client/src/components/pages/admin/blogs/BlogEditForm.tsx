import React, { FormEvent } from 'react';
import DatePicker from "react-datepicker";
import {style} from "typestyle";
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';
import { BlogFormProps, BlogFormState } from '../../../states/Blogs';
import ReactQuill from 'react-quill';
import { RTF_MODULES } from '../../../../util/EditorUtils';
import RefUtil from '../../../../util/RefUtil';

export default class BlogEditForm extends React.Component<BlogFormProps, BlogFormState> {
  private titleRef = React.createRef<HTMLInputElement>();

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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    if(this.props.match.params && this.props.match.params.id) {
        HttpService.get("/api/blogs/" + this.props.match.params.id).then((json) => {
            this.setState({
                content: json.content,
                title: json.title,
                startDateTime: json.startDateTime ? new Date(json.startDateTime) : null,
                endDateTime: json.endDateTime ? new Date(json.endDateTime) : null
            });
        }).catch(() => {
            this.setState({
                message: {
                    message: "Failed to load blog.",
                    type: STATUS.ERROR
                }
            });
        });
    }
  }

  private onChange(value:string) {
    this.setState({
        content: value
    });
  }

  private onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let payload = {
        _id: this.props.match.params.id,
        title: RefUtil.getValue(this.titleRef, ""),
        content: this.state.content,
        startDateTime: this.state.startDateTime,
        endDateTime: this.state.endDateTime
    };

   
    HttpService.put("/api/blogs/" + this.props.match.params.id, payload).then(() => {
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
                message: "Failed to update blog."
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
                    <input defaultValue={this.state.title} type="text" ref={this.titleRef} placeholder="Blog Title" />
                </label>

                <label className={this.timeClassName}>
                    <span>Publish Date</span>
                    <DatePicker
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
                        showTimeSelect
                        timeIntervals={15}
                        minDate={this.state.endDateTime ? this.state.endDateTime : new Date()}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Unpublish Time"
                        placeholderText="Unpublish Date"
                        selected={this.state.endDateTime}
                        onChange={(date) => {
                            this.setState({
                                endDateTime: date
                            });
                        }}
                    />
                </label>

                <label>
                    <span>Content</span>
                    <ReactQuill modules={RTF_MODULES} value={this.state.content} onChange={this.onChange}/>
                </label>

                <button>Update Blog</button>
            </form>
        </div>
    );
  }
}
