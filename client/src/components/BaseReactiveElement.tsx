import React from "react";

export default abstract class BaseReactiveElement<P, S> extends React.Component<P, S> {
    public componentWillReceiveProps(props:P) {
        this.setState({
            ...props as any
        });
    }
}
