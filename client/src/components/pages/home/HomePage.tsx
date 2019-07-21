import React from "react";
import { HomeViewProps, HomeViewState } from "../../states/Home";

export default class HomePage extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props:HomeViewProps) {
        super(props);

        this.state = {
            content: "",
            message: {
                message: "",
                type: ""
            }
        };
    }

    public render() {
        return (
            <div dangerouslySetInnerHTML={{
                __html: this.state.content
            }} />
        );
    }
}
