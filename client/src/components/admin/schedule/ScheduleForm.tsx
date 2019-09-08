import React, { MouseEvent } from 'react';
import { ScheduleFormProps, ScheduleFormState } from '../../states/Schedule';
import BaseAdminPage from '../BaseAdminPage';
import TextInput from '../../form/TextInput';
import DateInput from '../../form/DateInput';
import CheckboxInput from '../../form/CheckboxInput';
import RichTextInput from '../../form/RichTextInput';

export default class ScheduleForm extends BaseAdminPage<ScheduleFormProps, ScheduleFormState> {
  protected nameRef = React.createRef<HTMLInputElement>();
  protected typeRef = React.createRef<HTMLInputElement>();
  protected capacityRef = React.createRef<HTMLInputElement>();
  protected ageRestrictionsRef = React.createRef<HTMLInputElement>();
  protected costRef = React.createRef<HTMLInputElement>();
  protected locationRef = React.createRef<HTMLInputElement>();
  protected isFullRef = React.createRef<HTMLInputElement>();

  constructor(props:ScheduleFormProps) {
    super(props);

    this.state = {
        authentication: props.authentication,
        name: "",
        type: "",
        startDateTime: null,
        endDateTime: null,
        capacity: "",
        ageRestrictions: "",
        cost: "",
        location: "",
        description: "",
        isFull: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  protected onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  protected renderButton():JSX.Element | null {
      return null;
  }

  protected renderAuthenticatedView() {
    return (
        <div>
            <h2>Schedule / Event</h2>
            <form>
                <TextInput defaultValue={this.state.name} reference={this.nameRef} title="Event Name" />
                <TextInput defaultValue={this.state.type} reference={this.typeRef} title="Event Type (e.g. Hitting, Fielding, etc.)" />
                
                <DateInput onChange={(date: Date) => {
                    this.setState({
                        startDateTime: date
                    });
                }} date={this.state.startDateTime} title="Start Date" caption="Start Time" />

                <DateInput onChange={(date: Date) => {
                    this.setState({
                        endDateTime: date
                    });
                }} date={this.state.startDateTime} title="End Date" caption="End Time" />

                <TextInput defaultValue={this.state.capacity} reference={this.capacityRef} title="Capacity" />
                <TextInput defaultValue={this.state.ageRestrictions} reference={this.ageRestrictionsRef} title="Age Restrictions (e.g. 10+, none, etc.)" />
                <TextInput defaultValue={this.state.cost} reference={this.costRef} title="Cost (e.g. $100/person, $100/group, etc.)" />
                <TextInput defaultValue={this.state.location} reference={this.locationRef} title="Location" />
                <CheckboxInput reference={this.isFullRef} title="This course is full" />
                <TextInput defaultValue={this.state.type} reference={this.typeRef} title="Event Type (e.g. Hitting, Fielding, etc.)" />
                <RichTextInput content={this.state.description} onChange={(data:string) => {
                    this.setState({
                        description: data
                    });
                }} />

                {this.renderButton()}
            </form>
        </div>
    );
  }
}
