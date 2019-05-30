import React from "react";
import HttpService from "../../../util/HttpService";
import StatusBar, { STATUS } from "../../StatusBar";
import { AboutViewProps, AboutViewState } from "../../states/About";

export default class AboutPage extends React.Component<AboutViewProps, AboutViewState> {
    constructor(props:any) {
        super(props);

        this.state = {
            item: undefined,
            message: {
                message: "",
                type: ""
            }
        };

        HttpService.get("/api/about").then((json) => {
            this.setState({
                item: json
            });
        }).catch((e) => {
            this.setState({
                message: {
                    message: "Failed to load content.",
                    type: STATUS.ERROR
                }
            });
        });
    }

    private renderItem() {
        return (
            <div>
                {this.state.item}
            </div>
        );
    }

    public render() {
        return (
            <div>
                <StatusBar {...this.state.message} />
                {this.renderItem()}
            </div>
        );
    }
}
