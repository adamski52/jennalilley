import React, { MouseEvent } from 'react';
import ScheduleForm from './ScheduleForm';
import { ScheduleFormProps } from '../../states/Schedule';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import RefUtil from '../../../util/RefUtil';
import NevermindButton from '../../buttons/NevermindButton';
import SaveButton from '../../buttons/SaveButton';
import DeleteButton from '../../buttons/DeleteButton';

export default class ScheduleEditForm extends ScheduleForm {
  constructor(props:ScheduleFormProps) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onDelete() {
    if(!this.props.match.params || !this.props.match.params.id) {
        return;
    }

    if (!window.confirm("Deleting a class will disenroll everyone enrolled without notifying them.  That's up to you.  Are you sure you want to do this?")) {
        return;
    }

    HttpService.delete("/api/schedule/" + this.props.match.params.id).then(() => {
        this.props.setGlobalMessage(STATUS.ERROR, "Event deleted successfully.");
        
        this.onFetch();
    }).catch(() => {
        this.props.setGlobalMessage(STATUS.ERROR, "Failed to delete event.");
    });
  }


  private onFetch() {
    if(!this.props.match.params || !this.props.match.params.id) {
        return;
    }
    
    HttpService.get("/api/schedule/" + this.props.match.params.id).then((json) => {
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
    }).catch(() => {
        this.props.setGlobalMessage(STATUS.ERROR, "Failed to load event.");
    });
  }

  protected onSubmit(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if(!this.props.match.params || !this.props.match.params.id) {
        return;
    }

    let payload = {
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
    };

    HttpService.put("/api/schedule/" + this.props.match.params.id, payload).then(() => {
        this.props.setGlobalMessage(STATUS.SUCCESS, "Event updated successfully.");
    }).catch(() => {
        this.props.setGlobalMessage(STATUS.ERROR, "Failed to update event.");
    });
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
