import React, { FormEvent } from 'react';
import HttpService from '../../../../util/HttpService';
import { STATUS } from '../../../StatusBar';
import RefUtil from '../../../../util/RefUtil';
import { ScheduleFormProps } from '../../../states/Schedule';
import ScheduleForm from './ScheduleForm';

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

    HttpService.delete("/api/schedule/" + this.props.match.params.id).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "Event deleted successfully."
            }
        });

        this.onFetch();
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to delete event."
            }
        });
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
            message: {
                message: "",
                type: ""
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                message: "Failed to load event.",
                type: STATUS.ERROR
            }
        });
    });
  }

  protected onSubmit(e:FormEvent<HTMLFormElement>) {
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
        description: this.state.description
    };

    HttpService.put("/api/schedule/" + this.props.match.params.id, payload).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "Event updated."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to update event."
            }
        });
    });
  }

  protected renderButton() {
    return (
        <div>
            <button>Update Event</button>
            <button onClick={this.onDelete}>Delete Event</button>
        </div>
    );
  }
}
