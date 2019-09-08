import React from 'react';
import {CheckboxInputProps, CheckboxInputState} from "../states/CheckboxInput";

export default class TextInput extends React.Component<CheckboxInputProps, CheckboxInputState> {
    public render() {
        return (
            <label>
                <input type="checkbox" defaultChecked={this.props.defaultChecked} ref={this.props.reference} value="1" /> <span>{this.props.title}</span>
            </label>
        );
    }
}
