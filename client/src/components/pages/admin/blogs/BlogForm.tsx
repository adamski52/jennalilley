import React, { FormEvent } from 'react';
import DatePicker from "react-datepicker";
import {style} from "typestyle";
import StatusBar from '../../../StatusBar';
import { BlogFormProps, BlogFormState } from '../../../states/Blogs';
import ReactQuill from 'react-quill';
import { RTF_MODULES } from '../../../../util/EditorUtils';

export default abstract class BlogForm extends React.Component<BlogFormProps, BlogFormState> {
  protected titleRef = React.createRef<HTMLInputElement>();
  
  protected quillClassName = style({
    $nest: {
      ".ql-editor": {
        "height": "400px"
      }
    }
  });

  protected timeClassName = style({
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

  protected onChange(value:string) {
    this.setState({
        content: value
    });
  }

  protected renderButton() {
    return (
        <div>
            <button>Save</button>
        </div>
    );
  }

  protected onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  public render() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            <form onSubmit={this.onSubmit} className={this.quillClassName}>
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

                {this.renderButton()}
            </form>
        </div>
    );
  }
}
