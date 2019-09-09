import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../../image-upload/UploadAdapter';
import { RichTextInputProps, RichTextInputState } from '../../states/RichInputText';

export default class RichTextInput extends React.Component<RichTextInputProps, RichTextInputState> {
    public render() {
        return (
            <div>
                <span>{this.props.title}</span>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.props.content}
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
                            this.props.onChange(editor.getData());
                        }}
                    />
                </div>
            </div>
        );
    }
}
