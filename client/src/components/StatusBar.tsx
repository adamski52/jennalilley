import React from 'react';
import { IStatus } from '../util/TypeUtils';
export const STATUS = {
  ERROR: "error",
  SUCCESS: "success",
  WARN: "warn"
};

export default class StatusBar extends React.Component<IStatus, IStatus> {
  constructor(props:any) {
    super(props);

    this.state = {
      message: props.message || "",
      type: props.type || ""
    };

    this.onClose = this.onClose.bind(this);
  }

  private onClose() {
    this.setState({
      message: "",
      type: ""
    });
  }

  public componentWillReceiveProps(props:any) {
    this.setState({
      message: props.message || "",
      type: props.type || ""
    });
  }

  public getButtonClassName() {
    return "btn btn-status-" + this.state.type + " btn-small icon-times";
  }

  public getStatusBarClassName() {
    return "row status-bar status-bar-" + this.state.type;
  }

  public render() {
    if(!this.state.message) {
      return null;
    }

    return (
      <div className={this.getStatusBarClassName()}>
        <div className="col-10">{this.state.message}</div>
        <div className="col-2 text-right">
          <button className={this.getButtonClassName()} onClick={this.onClose}>Dismiss</button>
        </div>
      </div>
    );
  }
}
