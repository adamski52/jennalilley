import React, {MouseEvent} from 'react';
import HttpService from '../../../util/HttpService';
import { STATUS } from '../../StatusBar';
import { ScheduleFormProps, ScheduleViewAllState } from '../../states/Schedule';
import { ISchedule } from '../../../interfaces/Schedule';
import BaseAdminPage from '../BaseAdminPage';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

export default class ScheduleFormList extends BaseAdminPage<ScheduleFormProps, ScheduleViewAllState> {
    constructor(props:ScheduleFormProps) {
    super(props);

    this.state = {
        authentication: props.authentication,
        items: []
    };

    this.onDelete = this.onDelete.bind(this);
  }

  public componentDidMount() {
    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/schedule").then((json) => {
        this.setState({
            items: json
        });
    }).catch((e) => {
        this.props.setGlobalMessage(STATUS.ERROR, "Failed to load events.");
    });
  }

  private onDelete(item:ISchedule) {
    return (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        HttpService.delete("/api/schedule/" + item._id).then(() => {
            this.props.setGlobalMessage(STATUS.SUCCESS, "Event deleted successfully.");
            
            this.onFetch();
        }).catch(() => {
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to delete event.");
        });
    };
  }

  private renderItem(item:any) {
      return (
        <div className="row" key={item._id}>
            <EditButton to={"/admin/schedule/edit/" + item._id} label={item.name} authentication={this.props.authentication} />
            {item.type}
            {item.startDateTime}
            {item.endDateTime}
            {item.capacity}
            {item.ageRestrictions}
            {item.cost}
            {item.location}
            <DeleteButton onClick={this.onDelete(item)} authentication={this.props.authentication} />
        </div>
      );
  }

  private renderItems() {
      return this.state.items.map((item:ISchedule) => {
          return this.renderItem(item);
      });
  }

  protected renderAuthenticatedView() {
    return (
        <div>
            {this.renderItems()}
        </div>
    );
  }
}
