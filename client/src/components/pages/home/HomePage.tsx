import React from "react";
import { HomeViewProps, HomeViewState } from "../../../states/Home";
import HomeService from "../../../services/HomeService";

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

    private async onFetch() {
        try {
            let json = await HomeService.readAll(this.props.setGlobalMessage);
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

    private renderItem() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.state.item ? this.state.item.content : ""}} />
        );
    }

    public render() {
        return (
            <div className="main-content">
                {this.renderItem()}
            </div>
        );
    }
}
