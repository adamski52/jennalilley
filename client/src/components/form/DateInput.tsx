import React from 'react';
import { DateInputProps, DateInputState } from '../states/DateInput';
import DatePicker from "react-datepicker";

export default class DateInput extends React.Component<DateInputProps, DateInputState> {
    public render() {
        return (
            <label>
                <span>{this.props.title}</span>
                <DatePicker
                    showTimeSelect
                    timeIntervals={15}
                    minDate={this.props.date ? this.props.date : new Date()}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption={this.props.caption}
                    placeholderText={this.props.title}
                    selected={this.props.date}
                    onChange={this.props.onChange}
                />
            </label>
        );
    }
}
