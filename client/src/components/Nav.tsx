import React from "react";
import { Link } from "react-router-dom";

import "../img/sig-black.png";

export default class Nav extends React.Component<any, any> {
    public render() {
        return (
            <nav className="row nav">
                <div className="col-xs-8 col-xs-push-2 nav-contents">
                    <Link to="/"><i className="signature" /></Link>

                    <Link to="/">Home</Link>
                    <Link to="/about/">About</Link>
                    <Link to="/blogs/">Blogs</Link>
                    <Link to="/schedule/">Schedule</Link>
                    <Link to="/contact/">Contact</Link>
                    <Link to="/admin">Admin</Link>
                </div>
            </nav>
        );
    }
}
