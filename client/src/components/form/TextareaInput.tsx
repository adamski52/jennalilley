import React from 'react';
import { TextareaInputProps, TextareaInputState } from '../../states/TextareaInput';

export default class TextareaInput extends React.Component<TextareaInputProps, TextareaInputState> {
    public render() {
        return (
            <label className="input-group">
                <span className="input-title">{this.props.title}</span>
                <textarea className="form-control" ref={this.props.reference}> 
                    {this.props.defaultValue}
                </textarea>
            </label>
        );
    }
}
