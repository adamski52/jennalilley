import React, { FormEvent } from 'react';
import ReactQuill from 'react-quill';
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';
import { AboutFormProps, AboutFormState } from '../../../states/About';
import { RTF_MODULES } from '../../../../util/EditorUtils';

export default class AboutForm extends React.Component<AboutFormProps, AboutFormState> {
  private serviceUrl = "/api/about";

  constructor(props:AboutFormProps) {
    super(props);

    this.state = {
        content: "",
        message: {
          message: "",
          type: ""
        }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.onFetch();
  }

  private onFetch() {
    HttpService.get(this.serviceUrl).then((json) => {
        this.setState({
            content: json
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

  private onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let payload = {
        content: this.state.content
    };

    return HttpService.post(this.serviceUrl, payload).then(() => {
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

  private onChange(value:string) {
      this.setState({
          content: value
      });
  }

  public render() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            <form onSubmit={this.onSubmit}>
                <ReactQuill modules={RTF_MODULES} value={this.state.content} onChange={this.onChange}/>

                <button>Save About Page</button>
            </form>
        </div>
    );
  }
}
