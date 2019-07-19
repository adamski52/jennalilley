import React, { FormEvent } from 'react';
import DatePicker from "react-datepicker";
import { BlogFormProps, BlogFormState } from '../../states/Blogs';
import StatusBar from '../../StatusBar';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseSecurePage from '../BaseSecurePage';
import UploadAdapter from '../../../image-upload/UploadAdapter';
import { Link } from "react-router-dom";

export default class BlogForm extends BaseSecurePage<BlogFormProps, BlogFormState> {
  protected titleRef = React.createRef<HTMLInputElement>();
  
  constructor(props:BlogFormProps) {
    super(props);

    this.state = {
        isAuthenticated: !!props.isAuthenticated,
        isAdmin: !!props.isAdmin,
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

  protected renderButton():JSX.Element | null {
    return null;
  }

  protected onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  protected renderAuthenticatedView() {
    return (
        <div className="main-content">
            <StatusBar {...this.state.message} />

            <h2>Schedule / Event</h2>
            <form onSubmit={this.onSubmit}>
                <label className="form-group col-12">
                    <span>Blog Title</span>
                    <input className="form-control" defaultValue={this.state.title} type="text" ref={this.titleRef} placeholder="Blog Title" />
                </label>

                <label className="form-group col-12">
                    <span>Publish Date</span>
                    <DatePicker
                        className="form-control"
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

                <label className="form-group col-12">
                    <span>Unpublish Date</span>
                    <DatePicker
                        className="form-control"
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

                <div className="form-group col-12">
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
                </div>

                {this.renderButton()}
            </form>
        </div>
    );
  }
}
