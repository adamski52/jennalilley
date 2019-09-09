import React from 'react';
import { TextInputProps, TextInputState } from '../../states/TextInput';

export default class TextInput extends React.Component<TextInputProps, TextInputState> {
    public render() {
        return (
            <label>
                <span>{this.props.title}</span>
                <input defaultValue={this.props.defaultValue} type="text" ref={this.props.reference} placeholder={this.props.placeholder || this.props.title} />
            </label>
        );
    }
}
