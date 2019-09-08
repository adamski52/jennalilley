import React, { MouseEvent } from 'react';
import DatePicker from "react-datepicker";
import { ScheduleFormProps, ScheduleFormState } from '../../states/Schedule';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../../../image-upload/UploadAdapter';
import BaseAdminPage from '../BaseAdminPage';

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
            <form >
                <label>
                    <span>Event Name</span>
                    <input defaultValue={this.state.name} type="text" ref={this.nameRef} placeholder="Event Name" />
                </label>

                <label>
                    <span>Event Type (e.g. Hitting, Fielding, etc.)</span>
                    <input defaultValue={this.state.type} type="text" ref={this.typeRef} placeholder="Event Type" />
                </label>

                <label>
                    <span>Start Date</span>
                    <DatePicker
                        className="form-control"
                        showTimeSelect
                        timeIntervals={15}
                        minDate={new Date()}
                        placeholderText="Start Date"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Start Time"
                        selected={this.state.startDateTime}
                        onChange={(date) => {
                            this.setState({
                                startDateTime: date
                            });
                        }}
                    />
                </label>

                <label>
                    <span>End Date</span>
                    <DatePicker
                        className="form-control"
                        showTimeSelect
                        timeIntervals={15}
                        minDate={this.state.startDateTime ? this.state.startDateTime : new Date()}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="End Time"
                        placeholderText="End Date"
                        selected={this.state.endDateTime}
                        onChange={(date) => {
                            this.setState({
                                endDateTime: date
                            });
                        }}
                    />
                </label>

                <label>
                    <span>Capacity</span>
                    <input defaultValue={this.state.capacity} type="text" ref={this.capacityRef} placeholder="Capacity" />
                </label>

                <label>
                    <span>Age Restrictions (e.g. 10+, none, etc.)</span>
                    <input defaultValue={this.state.ageRestrictions} type="text" ref={this.ageRestrictionsRef} placeholder="Age Restrictions (e.g. 10+, none, etc.)" />
                </label>

                <label>
                    <span>Cost (e.g. $100/person, $100/group, etc.)</span>
                    <input defaultValue={this.state.cost} type="text" ref={this.costRef} placeholder="Cost (e.g. $100/person, $100/group, etc.)" />
                </label>

                <label>
                    <span>Location</span>
                    <input defaultValue={this.state.location} type="text" ref={this.locationRef} placeholder="Location" />
                </label>

                <label>
                    <input type="checkbox" defaultChecked={true} ref={this.isFullRef} value="1" /> <span>This course is full</span>
                </label>

                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.description}
                        config={{
                            extraPlugins: [UploadAdapter.AttachUploadAdapterPlugin],
                            image: {
                                toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                                styles: [
                                    'full',
                                    'alignLeft',
                                    'alignRight'
                                ]
                            }
                        }}
                        onChange={(_event: any, editor: any) => {
                            this.setState({
                                description: editor.getData()
                            });
                        }}
                    />
                </div>

                {this.renderButton()}
            </form>
        </div>
    );
  }
}
