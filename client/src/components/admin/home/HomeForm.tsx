import React, { FormEvent } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';
import UploadAdapter from '../../../image-upload/UploadAdapter';
import { Link } from "react-router-dom";
import BaseAdminPage from '../BaseAdminPage';
import { HomeFormProps, HomeFormState } from '../../states/Home';

export default class HomeForm extends BaseAdminPage<HomeFormProps, HomeFormState> {
  constructor(props: HomeFormProps) {
    super(props);

    this.state = {
      isAuthenticated: !!props.isAuthenticated,
      isAdmin: !!props.isAdmin,
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
    HttpService.get("/api/home").then((json) => {
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

    return HttpService.post("/api/home", payload).then(() => {
      this.setState({
        message: {
          type: STATUS.SUCCESS,
          message: "Home section updated."
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
      <div className="main-content">
        <StatusBar {...this.state.message} />

        <h2>Home Page</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group col-12">
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
          <div className="row admin-buttons">
            <div className="col-6">
              <Link to="/admin" className="btn btn-admin icon-undo">Nevermind</Link>
            </div>
            <div className="col-6 text-right">
              <button className="btn btn-admin icon-floppy-o">Update Home Page</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
