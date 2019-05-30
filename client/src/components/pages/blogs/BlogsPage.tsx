import React from "react";
import HttpService from "../../../util/HttpService";
import { BlogViewOneProps, BlogViewOneState } from "../../states/Blogs";

export default class BlogsPage extends React.Component<BlogViewOneProps, BlogViewOneState> {
    constructor(props:any) {
        super(props);

        this.state = {
            item: undefined,
            message: {
                message: "",
                type: ""
            }
        };

        HttpService.get("/api/blogs/" + this.props.id).then((json) => {
            this.setState({
                item: json
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    public render() {
        if(!this.state.item) {
            return null;
        }

        return (
            <div>
                <h2>{this.state.item.title}</h2>
                <div>
                    {this.state.item.content}
                </div>
            </div>
        );
    }
}
