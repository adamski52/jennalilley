import React from "react";
import HttpService from "../../../util/HttpService";
import StatusBar, { STATUS } from "../../StatusBar";
import { HomeViewProps, HomeViewState } from "../../states/Home";

export default class HomePage extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props:HomeViewProps) {
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
        HttpService.get("/api/home").then((json) => {
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
            <div dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
        );
    }

    public render() {
        return (
            <div className="main-content">
                <StatusBar {...this.state.message} />
                
                {this.renderItem()}
            </div>
        );
    }
}
