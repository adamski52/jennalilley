import React, { MouseEvent } from 'react';
import ScheduleForm from './ScheduleForm';
import { ScheduleFormProps } from '../../../states/Schedule';
import RefUtil from '../../../util/RefUtil';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import DeleteButton from '../../buttons/DeleteButton';
import ScheduleService from '../../../services/ScheduleService';

export default class ScheduleEditForm extends ScheduleForm {
  constructor(props:ScheduleFormProps) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private async onDelete() {
    if(!this.props.match.params || !this.props.match.params.id) {
        return;
    }

    if (!window.confirm("Deleting a class will disenroll everyone enrolled without notifying them.  That's up to you.  Are you sure you want to do this?")) {
        return;
    }

    try {
      await ScheduleService.delete(this.props.setGlobalMessage, this.props.match.params.id);
      this.onFetch();
    } catch(e) {}
  }


  private async onFetch() {
    if(!this.props.match.params || !this.props.match.params.id) {
        return;
    }
    
    try {
      let json = await ScheduleService.readOne(this.props.setGlobalMessage, this.props.match.params.id);
      this.setState({
          name: json.name,
          type: json.type,
          startDateTime: json.startDateTime ? new Date(json.startDateTime) : null,
          endDateTime: json.endDateTime ? new Date(json.endDateTime) : null,
          capacity: json.capacity,
          ageRestrictions: json.ageRestrictions,
          cost: json.cost,
          location: json.location,
          description: json.description,
          isFull: json.isFull
      });
    } catch(e) {}
  }

  protected async onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if(!this.props.match.params || !this.props.match.params.id) {
        return;
    }

    try {
      await ScheduleService.update(this.props.setGlobalMessage, {
          _id: this.props.match.params.id,
          name: RefUtil.getValue(this.nameRef, ""),
          type: RefUtil.getValue(this.typeRef, ""),
          startDateTime: this.state.startDateTime,
          endDateTime: this.state.endDateTime,
          capacity: RefUtil.getValue(this.capacityRef, ""),
          ageRestrictions: RefUtil.getValue(this.ageRestrictionsRef, ""),
          cost: RefUtil.getValue(this.costRef, ""),
          location: RefUtil.getValue(this.locationRef, ""),
          isFull: RefUtil.getValue(this.isFullRef, "") === "1",
          description: this.state.description
      });
    } catch(e) {}
  }

  protected renderButton() {
    return (
        <div>
            <NevermindButton authentication={this.props.authentication} />
            <DeleteButton onClick={this.onDelete} authentication={this.props.authentication} />
            <SaveButton onClick={this.onSubmit} authentication={this.props.authentication} />
        </div>
    );
  }
}
