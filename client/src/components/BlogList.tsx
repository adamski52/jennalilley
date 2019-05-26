import React from 'react';
import fetch from "cross-fetch";
import Cookies from 'js-cookie';
import { IBlog } from "../../../server/src/models/Blog";

export default class BlogList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
        blogs: []
    };

    fetch("/api/blogs", {
        headers: {
            "Authorization": "JWT " + Cookies.get("TOKEN")
        }
    }).then((response:Response) => {
        return response.json();
    }).then((blogs) => {
        console.log("got blogs", blogs);
        this.setState({
            blogs: blogs || []
        });
    });
  }

  private onDelete(blog:IBlog) {
    fetch("/api/blogs/" + blog._id, {
        method: "DELETE",
        headers: {
          "Authorization": "JWT " + Cookies.get("TOKEN")
        }
      }).then((response:Response) => {
        console.log("delete by id", response);
      });
  }

  private renderDate(blog:IBlog) {
      if(blog.startDateTime) {
          return (
              <p>{blog.startDateTime}</p>
          );
      }

      return null;
  }

  private renderItem(blog:IBlog) {
      return (
        <div key={blog._id} className="row">
            <div className="col-xs-9">
                <p>{blog.title}</p>
                {this.renderDate(blog)}
                <div>{blog.content}</div>
            </div>
            <div className="col-xs-3">
                <button onClick={(e) => {
                    return this.onDelete(blog);
                }}>Delete</button>
            </div>
        </div>
      );
  }

  private renderItems() {
      return this.state.blogs.map((blog:IBlog) => {
        return this.renderItem(blog);
      });
  }

  public render() {
    return (
        <div>
            {this.renderItems()}
        </div>
    );
  }
}
