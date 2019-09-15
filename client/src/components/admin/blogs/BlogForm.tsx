import React, { MouseEvent } from 'react';
import { BlogFormProps, BlogFormState } from '../../../states/Blogs';
import BaseAdminPage from '../BaseAdminPage';
import RichTextInput from '../../form/RichTextInput';
import DateInput from "../../form/DateInput";
import TextInput from '../../form/TextInput';

export default class BlogForm extends BaseAdminPage<BlogFormProps, BlogFormState> {
  protected titleRef = React.createRef<HTMLInputElement>();
  
  constructor(props:BlogFormProps) {
    super(props);

    this.state = {
        ...this.state,
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
                <TextInput defaultValue={this.state.title} reference={this.titleRef} title="Blog Title" />

                <DateInput onChange={(date: Date) => {
                    this.setState({
                        startDateTime: date
                    });
                }} date={this.state.startDateTime} title="Publish Date" caption="Publish Time" />

                <DateInput onChange={(date: Date) => {
                    this.setState({
                        endDateTime: date
                    });
                }} date={this.state.endDateTime} title="Unpublish Date" caption="Unpublish Time" />

                <RichTextInput content={this.state.content} onChange={(data: string) => {
                    this.setState({
                        content: data
                    });
                }} />

                {this.renderButton()}
            </form>
        </div>
    );
  }
}
