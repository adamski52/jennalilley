import React, { FormEvent } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AboutFormProps, AboutFormState } from '../../states/About';
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';
import UploadAdapter from '../../../image-upload/UploadAdapter';
import BaseSecurePage from '../BaseSecurePage';
import { AdminViewState, AdminViewProps } from '../../states/Admin';

export default class AboutForm extends BaseSecurePage<AdminViewProps & AboutFormProps, AdminViewState & AboutFormState> {
  private AttachUploadAdapterPlugin = function (editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new UploadAdapter(loader);
    };
  }

  constructor(props: AboutFormProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      content: "",
      message: {
        message: "",
        type: ""
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/about").then((json) => {
      this.setState({
        content: json[0].content
      });
    }).catch(() => {
      this.setState({
        message: {
          type: STATUS.ERROR,
          message: "Failed to fetch content."
        }
      });
    });
  }

  private onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let payload = {
      content: this.state.content
    };

    return HttpService.post("/api/about", payload).then(() => {
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
          <CKEditor
            editor={ClassicEditor}
            data={this.state.content}
            config={{
              extraPlugins: [this.AttachUploadAdapterPlugin]
            }}
            onChange={(_event: any, editor: any) => {
              this.setState({
                content: editor.getData()
              });
            }}
          />
          <button>Save About Page</button>
        </form>
      </div>
    );
  }
}
