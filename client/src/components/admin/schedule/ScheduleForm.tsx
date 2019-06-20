import React, { FormEvent } from 'react';
import DatePicker from "react-datepicker";
import { ScheduleFormProps, ScheduleFormState } from '../../states/Schedule';
import StatusBar from '../../StatusBar';
import BaseSecurePage from '../BaseSecurePage';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminViewProps, AdminViewState } from '../../states/Admin';
import UploadAdapter from '../../../image-upload/UploadAdapter';

export default class ScheduleForm extends BaseSecurePage<AdminViewProps & ScheduleFormProps, AdminViewState & ScheduleFormState> {
  protected nameRef = React.createRef<HTMLInputElement>();
  protected typeRef = React.createRef<HTMLInputElement>();
  protected capacityRef = React.createRef<HTMLInputElement>();
  protected ageRestrictionsRef = React.createRef<HTMLInputElement>();
  protected costRef = React.createRef<HTMLInputElement>();
  protected locationRef = React.createRef<HTMLInputElement>();
  

//   protected timeClassName = style({
//     "$nest": {
//         ".react-datepicker__time-container": {
//             "width": "100px"
//         },
//         ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box": {
//             "width": "100%"
//         },
//         ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item": {
//             "padding": "10px 0 0 0"
//         },
//         ".react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button)": {
//             "right": "110px"
//         }
//     }
//   });
  
  constructor(props:ScheduleFormProps) {
    super(props);

    this.state = {
        isAuthenticated: false,
        name: "",
        type: "",
        startDateTime: null,
        endDateTime: null,
        capacity: "",
        ageRestrictions: "",
        cost: "",
        location: "",
        description: "",
        message: {
            message: "",
            type: ""
        }
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  protected onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  protected renderButton() {
      return (
          <div>
              <button>Save</button>
          </div>
      );
  }

  protected renderAuthenticatedView() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            <form onSubmit={this.onSubmit}>
                <label>
                    <span>Event Name</span>
                    <input defaultValue={this.state.name} type="text" ref={this.nameRef} placeholder="Event Name" />
                </label>

                <label>
                    <span>Event Type (e.g. Hitting, Fielding, etc.)</span>
                    <input defaultValue={this.state.type} type="text" ref={this.typeRef} placeholder="Event Type" />
                </label>

                <label className="">
                    <span>Start Date</span>
                    <DatePicker
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

                <label className="">
                    <span>End Date</span>
                    <DatePicker
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
                    <span>Content</span>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.description}
                        config={{
                            extraPlugins: [UploadAdapter.AttachUploadAdapterPlugin]
                        }}
                        onChange={(_event: any, editor: any) => {
                            this.setState({
                                description: editor.getData()
                            });
                        }}
                    />
                </label>

                {this.renderButton()}
            </form>
        </div>
    );
  }
}
