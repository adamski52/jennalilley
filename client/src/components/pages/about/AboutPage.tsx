import React from "react";
import { AboutViewProps, AboutViewState } from "../../../states/About";
import AboutService from "../../../services/AboutService";
import BaseReactiveElement from "../../BaseReactiveElement";

export default class AboutPage extends BaseReactiveElement<AboutViewProps, AboutViewState> {
    constructor(props:AboutViewProps) {
        super(props);

        this.state = {
            ...this.state,
            item: undefined
        };
    }

    public componentDidMount() {
        this.onFetch();
    }

    private async onFetch() {
        try {
            let json = await AboutService.readAll(this.props.setGlobalMessage);
            this.setState({
                item: json[0]
            });
        }
        catch(e) {
            this.setState({
                item: undefined
            });
        }
    }

    public render() {
        return (
            <div>
                <h2>About Me</h2>
                <div dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
            </div>
        );
    }
}
