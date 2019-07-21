import React from "react";
import HeroImg from "../../../img/hero.jpg";
import { HomeViewProps, HomeViewState } from "../../states/Home";

export default class HeroImage extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props:HomeViewProps) {
        super(props);

        this.state = {
            content: "<p>oh hi</p>",
            message: {
                message: "",
                type: ""
            }
        };
    }

    public render() {
        return (
            <img alt="" src={HeroImg} className="hero"/>
        );
    }
}
