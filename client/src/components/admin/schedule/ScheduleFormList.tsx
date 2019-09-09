import React, {MouseEvent} from 'react';
import { ScheduleFormProps, ScheduleViewAllState } from '../../../states/Schedule';
import { ISchedule } from '../../../interfaces/Schedule';
import BaseAdminPage from '../BaseAdminPage';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';
import ScheduleService from '../../../services/ScheduleService';

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

  private async onFetch() {
    try {
      let json = await ScheduleService.readAll(this.props.setGlobalMessage);
      this.setState({
          items: json
      });
    }
    catch(e) {}
  }

  private onDelete(item:ISchedule) {
    return async (e:MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        await ScheduleService.delete(this.props.setGlobalMessage, item._id);
        this.onFetch();
      } catch(e) {}
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
