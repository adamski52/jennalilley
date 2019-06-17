import React from "react";
import StatusBar from "../../StatusBar";

export default class HomePage extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            message: {
                type: "",
                message: ""
            }
        };
    }


    public render() {
        return (
            <div>
                <StatusBar {...this.state.message} />
            </div>
        );
    }
}
