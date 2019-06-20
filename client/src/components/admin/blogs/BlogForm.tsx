import React, { FormEvent } from 'react';
import DatePicker from "react-datepicker";
import { BlogFormProps, BlogFormState } from '../../states/Blogs';
import StatusBar from '../../StatusBar';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminViewState, AdminViewProps } from '../../states/Admin';
import BaseSecurePage from '../BaseSecurePage';
import UploadAdapter from '../../../image-upload/UploadAdapter';

export default class BlogForm extends BaseSecurePage<AdminViewProps & BlogFormProps, AdminViewState & BlogFormState> {
  protected titleRef = React.createRef<HTMLInputElement>();
  

//   protected timeClassName = style({
//     "$nest": {
//         ".react-datepicker__time-container": {
//             "width": "100px"
//         },
//         ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box": {
//             "width": "100%"
//         },
//         ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item": {
//             "padding": "10px 0 0 0"
//         },
//         ".react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button)": {
//             "right": "110px"
//         }
//     }
//   });
  
  constructor(props:BlogFormProps) {
    super(props);

    this.state = {
        isAuthenticated: false,
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

  protected renderAuthenticatedView() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            <form onSubmit={this.onSubmit}>
                <label>
                    <span>Blog Title</span>
                    <input defaultValue={this.state.title} type="text" ref={this.titleRef} placeholder="Blog Title" />
                </label>

                <label className="">
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

                <label className="">
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
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.content}
                        config={{
                            extraPlugins: [UploadAdapter.AttachUploadAdapterPlugin]
                        }}
                        onChange={(_event: any, editor: any) => {
                            this.setState({
                                content: editor.getData()
                            });
                        }}
                    />
                </label>

                {this.renderButton()}
            </form>
        </div>
    );
  }
}
