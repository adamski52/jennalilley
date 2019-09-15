import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component<any, any> {
    public render() {
        return (
            <nav className="col nav">
                <Link className="nav-item" to="/">Home</Link>
                <Link className="nav-item" to="/about/">About</Link>
                <Link className="nav-item" to="/blogs/">Blogs</Link>
                <Link className="nav-item" to="/schedule/">Schedule</Link>
                <Link className="nav-item" to="/contact/">Contact</Link>
            </nav>
        );
    }
}
