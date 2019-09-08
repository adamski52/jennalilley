import React, { MouseEvent } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import UploadAdapter from '../../../image-upload/UploadAdapter';
import BaseAdminPage from '../BaseAdminPage';
import { HomeFormProps, HomeFormState } from '../../states/Home';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';

export default class HomeForm extends BaseAdminPage<HomeFormProps, HomeFormState> {
  constructor(props: HomeFormProps) {
    super(props);

    this.state = {
      authentication: props.authentication,
      content: ""
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
      this.props.setGlobalMessage(STATUS.ERROR, "Failed to fetch content.");
    });
  }

  private onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let payload = {
      content: this.state.content
    };

    HttpService.post("/api/home", payload).then(() => {
      this.props.setGlobalMessage(STATUS.SUCCESS, "Home section updated successfully.");
    }).catch(() => {
      this.props.setGlobalMessage(STATUS.ERROR, "Failed to save content.");
    });
  }

  public render() {
    return (
      <div>
        <h2>Home Page</h2>
        <form>
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
          <NevermindButton authentication={this.props.authentication} />
          <SaveButton onClick={this.onSubmit} authentication={this.props.authentication} />
        </form>
      </div>
    );
  }
}
