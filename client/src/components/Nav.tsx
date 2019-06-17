import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component<any, any> {
    public render() {
        return (
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/about/">About</Link>
                <Link to="/blogs/">Blogs</Link>
                <Link to="/schedule/">Schedule</Link>
                <Link to="/contact/">Contact</Link>
                <Link to="/admin">Admin</Link>
            </nav>
        );
    }
}
