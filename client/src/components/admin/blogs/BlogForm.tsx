import React, { MouseEvent } from 'react';
import DatePicker from "react-datepicker";
import { BlogFormProps, BlogFormState } from '../../states/Blogs';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../../../image-upload/UploadAdapter';
import BaseAdminPage from '../BaseAdminPage';

export default class BlogForm extends BaseAdminPage<BlogFormProps, BlogFormState> {
  protected titleRef = React.createRef<HTMLInputElement>();
  
  constructor(props:BlogFormProps) {
    super(props);

    this.state = {
        authentication: props.authentication,
        content: "",
        title: "",
        startDateTime: null,
        endDateTime: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  protected renderButton():JSX.Element | null {
    return null;
  }

  protected onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  protected renderAuthenticatedView() {
    return (
        <div>
            <h2>Schedule / Event</h2>
            <form>
                <label>
                    <span>Blog Title</span>
                    <input defaultValue={this.state.title} type="text" ref={this.titleRef} placeholder="Blog Title" />
                </label>

                <label>
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

                <label>
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

                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.content}
                        config={{
                            extraPlugins: [UploadAdapter.AttachUploadAdapterPlugin],
                            image: {
                                toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                                styles: [
                                    'full',
                                    'alignLeft',
                                    'alignRight'
                                ]
                            }
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
