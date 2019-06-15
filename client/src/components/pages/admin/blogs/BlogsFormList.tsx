import React from 'react';
import HttpService from '../../../../util/HttpService';
import StatusBar, { STATUS } from '../../../StatusBar';
import { BlogFormProps } from '../../../states/Blogs';
import { Link } from 'react-router-dom';

export default class BlogsFormList extends React.Component<BlogFormProps, any> {
  constructor(props:BlogFormProps) {
    super(props);

    this.state = {
        blogs: []
    };

    this.onDelete = this.onDelete.bind(this);

    this.onFetch();
  }

  private onFetch() {
    HttpService.get("/api/blogs").then((json) => {
        this.setState({
            blogs: json
        });
    }).catch((e) => {
        this.setState({
            message: {
                message: "Failed to load blogs.",
                type: STATUS.ERROR
            }
        });
    });
  }

  private onDelete(blog:any) {
    return (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        HttpService.delete("/api/blogs/" + blog._id).then(() => {
            this.setState({
                message: {
                  type: STATUS.SUCCESS,
                  message: "Blog deleted successfully."
                }
              });

            this.onFetch();
        }).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to delete blog."
                }
            });
        });
    };
  }

  private renderItem(blog:any) {
      return (
        <div className="row" key={blog._id}>
            <div className="col-xs-6">
                <Link to={"/admin/blogs/edit/" + blog._id}>{blog.title}</Link>
            </div>
            <div className="col-xs-2">
                {blog.startDateTime}
            </div>
            <div className="col-xs-2">
                {blog.endDateTime}
            </div>
            <div className="col-xs-2">
                <button onClick={this.onDelete(blog)}>Delete</button>
            </div>
        </div>
      );
  }

  private renderItems() {
      return this.state.blogs.map((blog:any) => {
          return this.renderItem(blog);
      });
  }

  public render() {
    return (
        <div>
            <StatusBar {...this.state.message} />
            <div>
                {this.renderItems()}
            </div>
        </div>
    );
  }
}
