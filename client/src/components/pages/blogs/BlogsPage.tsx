import React from "react";
import HttpService from "../../../util/HttpService";
import { BlogViewAllProps, BlogViewAllState } from "../../states/Blogs";
import StatusBar, { STATUS } from "../../StatusBar";
import { IBlog } from "../../../interfaces/Blog";

export default class BlogsPage extends React.Component<BlogViewAllProps, BlogViewAllState> {
    constructor(props:BlogViewAllProps) {
        super(props);

        this.state = {
            items: [],
            message: {
                message: "",
                type: ""
            }
        };
    }

    public componentDidMount() {
        this.onFetch();
    }

    private onFetch() {
        HttpService.get("/api/blogs/").then((json:IBlog[]) => {
            let items = json || [],
                today = new Date();

            items = items.filter((item) => {
                return item.startDateTime == null || item.startDateTime > today;
            }).filter((item) => {
                return item.endDateTime == null || item.endDateTime < today;
            }).sort((lhs, rhs) => {
                if(lhs.startDateTime != null && rhs.startDateTime != null) {
                    if(lhs.startDateTime < rhs.startDateTime) {
                        return -1;
                    }

                    if(lhs.startDateTime > rhs.startDateTime) {
                        return 1;
                    }
                }

                return 0;
            });

            this.setState({
                items: items
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

    private renderPostedAt(item:IBlog) {
        if(!item.startDateTime) {
            return null;
        }

        return (
            <p className="blog-title">{new Date(item.startDateTime).toLocaleString()}</p>
        );
    }

    private renderItem(item:IBlog) {
        return (
          <div className="col-12 blog-post" key={item._id}>
              <h3>{item.title}</h3>
              {this.renderPostedAt(item)}
              <div dangerouslySetInnerHTML={{__html: item.content}} />
          </div>
        );
    }
  
    private renderItems() {
        return this.state.items.map((item:IBlog) => {
            return this.renderItem(item);
        });
    }
  
    public render() {
      return (
        <div className="main-content">
              <StatusBar {...this.state.message} />
            
              <div className="col-12">
                  <h2>Blogs</h2>
                  {this.renderItems()}
              </div>
          </div>
      );
    }
}
