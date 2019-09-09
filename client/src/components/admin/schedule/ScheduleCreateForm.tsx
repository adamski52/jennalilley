import React, { MouseEvent } from 'react';
import ScheduleForm from './ScheduleForm';
import RefUtil from '../../../util/RefUtil';
import ScheduleService from '../../../services/ScheduleService';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';

export default class ScheduleCreateForm extends ScheduleForm {
  protected async onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await ScheduleService.create(this.props.setGlobalMessage, {
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
            <SaveButton onClick={this.onSubmit} authentication={this.props.authentication} />
        </div>
    );
  }
}
