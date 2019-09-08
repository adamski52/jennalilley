import React from "react";
import HttpService from "../../../util/HttpService";
import { STATUS } from "../../StatusBar";
import { AboutViewProps, AboutViewState } from "../../states/About";

export default class AboutPage extends React.Component<AboutViewProps, AboutViewState> {
    constructor(props:AboutViewProps) {
        super(props);

        this.state = {
            item: undefined
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
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to load content.");
        });
    }

    private renderItem() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
        );
    }

    public render() {
        return (
            <div>
                <h2>About Me</h2>
                {this.renderItem()}
            </div>
        );
    }
}
