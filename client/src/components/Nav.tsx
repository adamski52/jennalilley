import React from "react";
import { Link } from "react-router-dom";

import SigImg from "../img/sig-white-with-glow.png";

export class Nav extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.getMenuClassName = this.getMenuClassName.bind(this);
    }

    public getMenuClassName() {
        let classes = ["btn", "btn-menu", "d-sm-none", (this.state.isOpen ? "icon-times" : "icon-bars")];
        
        return classes.join(" ");
    }

    public onToggleMenu() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public getNavClassName() {
        let classes = [this.props.className, "nav"];
        if(this.state.isOpen) {
            classes.push("open");
        }

        return classes.join(" ");
    }

    public render() {
        return (
            <nav className={this.getNavClassName()}>
                <button onClick={this.onToggleMenu} className={this.getMenuClassName()}/>
                <Link to="/"><img alt="Jenna Lilley" src={SigImg} /></Link>
                <Link className="nav-item" to="/about/">About</Link>
                <Link className="nav-item" to="/blogs/">Blogs</Link>
                <Link className="nav-item" to="/schedule/">Schedule</Link>
                <Link className="nav-item" to="/contact/">Contact</Link>
            </nav>
        );
    }
}