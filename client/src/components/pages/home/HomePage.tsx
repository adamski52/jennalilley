import React from "react";
import StatusBar from "../../StatusBar";
import HeroImg from "../../../img/hero.jpg";

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
            <div className="row page home-page">
                <StatusBar {...this.state.message} />
                <img src={HeroImg} className="hero"/>
            </div>
        );
    }
}
