import React from 'react';
import { IStatus } from '../interfaces/Status';
import OKButton from './buttons/OKButton';

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
      message: ""
    });
  }

  public componentWillReceiveProps(props:any) {
    this.setState({
      message: props.message || "",
      type: props.type || ""
    });
  }


  public render() {
    let open = this.state.message ? "open" : "closed";

    return (
      <div className={"row status-bar layout-tight status-" + this.state.type + " status-" + open}>
        <div className="col text-center">{this.state.message}</div>
        <div className="w-150 text-right">
          <OKButton onClick={this.onClose} />
        </div>
      </div>
    );
  }
}
