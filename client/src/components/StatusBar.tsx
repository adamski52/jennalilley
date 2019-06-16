import React from 'react';
import {style} from "typestyle";
export const STATUS = {
  ERROR: "error",
  SUCCESS: "success",
  WARN: "warn"
};

export default class StatusBar extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.state = {
      message: props.message || "",
      type: ""
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
      return style({
        "display": "none"
      });
    }

    return style({
      "padding": "5px",
      ...this.getColors()
    });
  }

  private getColors() {
    switch(this.state.type) {
      case STATUS.ERROR:
        return {
          "color": "#bf3c3c",
          "background": "#ffe0e0"
        };
      case STATUS.SUCCESS:
        return {
          "color": "#3d8228",
          "background": "#f3fdf0"
        };
      case STATUS.WARN:
        return {
          "color": "#e6d334",
          "background": "#dcaf26"
        };
      default:   
        return {
          "color": "#097f94",
          "background": "#e5fbff"
        };
      }
  }

  public render() {
    return (
      <div className={this.getStatusBarClassName()}>{this.state.message}</div>
    );
  }
}
