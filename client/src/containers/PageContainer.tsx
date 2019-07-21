import React from "react";
import { PageContainerBaseProps, PageContainerBaseState } from "../states/Containers";

export default abstract class PageContainer<P extends PageContainerBaseProps, S extends PageContainerBaseState> extends React.Component<P & PageContainerBaseProps, S & PageContainerBaseState> {
    public componentDidMount() {
        this.onFetch();
    }

    protected onFetch() {
        if(this.props.fetch) {
            this.props.fetch();
        }
    }

    public render():JSX.Element | null {
        return null;
    }
}
