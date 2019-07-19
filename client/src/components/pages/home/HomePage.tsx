import React from "react";
import HeroImg from "../../../img/hero.jpg";
import { HomeViewProps, HomeViewState } from "../../states/Home";

export default class HomePage extends React.Component<HomeViewProps, HomeViewState> {
    public render() {
        return (
            <div className="home-page">
                <img alt="" src={HeroImg} className="hero"/>
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
