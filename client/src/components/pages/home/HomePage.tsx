import React from "react";
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
            <div className="home-page">
                <img src={HeroImg} className="hero"/>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col-3 left-bar">
                    </div>
                </div>
            </div>
        );
    }
}
