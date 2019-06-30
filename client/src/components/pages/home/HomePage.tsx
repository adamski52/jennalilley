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
            <div className="row page home-page">
                <img src={HeroImg} className="hero"/>
                <div className="col-xs-12 home-content">
                    <div className="col-xs-8">
                    </div>
                    <div className="col-xs-4 left-bar">
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                </div>
            </div>
        );
    }
}
