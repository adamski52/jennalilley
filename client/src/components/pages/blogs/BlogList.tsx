import React from 'react';
import { IBlog } from "../../../../../server/src/models/Blog";
import HttpService from '../../../util/HttpService';
import StatusBar, { STATUS } from '../../StatusBar';

export default class BlogList extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
        blogs: [],
        message: {
            type: "",
            message: ""
        }
    };

    HttpService.get("/api/blogs").then((blogs) => {
        this.setState({
            blogs: blogs || []
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to fetch blogs."
            }
        });
    });
  }

  private onDelete(blog:IBlog) {
    HttpService.delete("/api/blogs/" + blog._id).then(() => {
        this.setState({
            message: {
                type: STATUS.SUCCESS,
                message: "Blog deleted successfully."
            }
        });
    }).catch(() => {
        this.setState({
            message: {
                type: STATUS.ERROR,
                message: "Failed to delete blog."
            }
        });
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
            <StatusBar {...this.state.message} />
            {this.renderItems()}
        </div>
    );
  }
}
