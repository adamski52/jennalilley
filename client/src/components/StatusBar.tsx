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
  }

  public componentWillReceiveProps(props:any) {
    this.setState({
      message: props.message || "",
      type: props.type || ""
    });
  }

  public getStatusBarClassName() {
    if(!this.state.message) {
      return "status-bar status-bar-hidden";
    }

    return "status-bar status-bar-" + this.state.type;
  }

  public render() {
    return (
      <div className={this.getStatusBarClassName()}>{this.state.message}</div>
    );
  }
}
