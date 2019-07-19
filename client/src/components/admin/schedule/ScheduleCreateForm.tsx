import React, { FormEvent } from 'react';
import ScheduleForm from './ScheduleForm';
import RefUtil from '../../../util/RefUtil';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import { Link } from "react-router-dom";

export default class ScheduleCreateForm extends ScheduleForm {
  protected onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let payload = {
        name: RefUtil.getValue(this.nameRef, ""),
        type: RefUtil.getValue(this.typeRef, ""),
        startDateTime: this.state.startDateTime,
        endDateTime: this.state.endDateTime,
        capacity: RefUtil.getValue(this.capacityRef, ""),
        ageRestrictions: RefUtil.getValue(this.ageRestrictionsRef, ""),
        cost: RefUtil.getValue(this.costRef, ""),
        location: RefUtil.getValue(this.locationRef, ""),
        description: this.state.description
    };

    HttpService.post("/api/schedule", payload).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "Event created."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to create event."
            }
        });
    });
  }

  protected renderButton() {
    return (
        <div className="row admin-buttons">
            <div className="col-6">
                <Link to="/admin" className="btn btn-admin icon-undo">Nevermind</Link>
            </div>
            <div className="col-6 text-right">
                <button className="btn btn-admin icon-floppy-o">Create Event</button>
            </div>
        </div>
    );
  }
}
