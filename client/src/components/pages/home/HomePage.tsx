import React from "react";
import HttpService from "../../../util/HttpService";
import { STATUS } from "../../StatusBar";
import { HomeViewProps, HomeViewState } from "../../states/Home";

export default class HomePage extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props:HomeViewProps) {
        super(props);

        this.state = {
            item: undefined
        };
    }

    public componentDidMount() {
        this.onFetch();
    }

    private onFetch() {
        HttpService.get("/api/home").then((json) => {
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
                {this.renderItem()}
            </div>
        );
    }
}
