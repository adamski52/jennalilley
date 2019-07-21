import React from "react";
import HttpService from "../../../util/HttpService";
import StatusBar, { STATUS } from "../../StatusBar";
import { AboutViewProps, AboutViewState } from "../../states/About";
import { AdminViewProps } from "../../states/Admin";

export default class AboutPage extends React.Component<AboutViewProps, AboutViewState> {
    constructor(props:AdminViewProps) {
        super(props);

        this.state = {
            item: undefined,
            message: {
                message: "",
                type: ""
            }
        };
    }

    public componentDidMount() {
        this.onFetch();
    }

    private onFetch() {
        HttpService.get("/api/about").then((json) => {
            this.setState({
                item: json[0]
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
            <div className="col-12" dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
        );
    }

    public render() {
        return (
            <div className="main-content">
                <StatusBar {...this.state.message} />
                
                <h2>About Me</h2>
                {this.renderItem()}
            </div>
        );
    }
}
