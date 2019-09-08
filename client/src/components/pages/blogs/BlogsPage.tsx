import React from "react";
import HttpService from "../../../util/HttpService";
import { BlogViewAllProps, BlogViewAllState } from "../../states/Blogs";
import { STATUS } from "../../StatusBar";
import { IBlog } from "../../../interfaces/Blog";

export default class BlogsPage extends React.Component<BlogViewAllProps, BlogViewAllState> {
    constructor(props:BlogViewAllProps) {
        super(props);

        this.state = {
            items: []
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
            this.props.setGlobalMessage(STATUS.ERROR, "Failed to fetch blogs.");
        });
    }

    private renderPostedAt(item:IBlog) {
        if(!item.startDateTime) {
            return null;
        }

        return (
            <p>{new Date(item.startDateTime).toLocaleString()}</p>
        );
    }

    private renderItem(item:IBlog) {
        return (
          <div key={item._id}>
              <h3>{item.title}</h3>
              {this.renderPostedAt(item)}
              <div dangerouslySetInnerHTML={{__html: item.content}} />
          </div>
        );
    }
  
    private renderItems() {
        if(this.state.items.length <= 0) {
            return (
                <p>There are currently no blog postings.</p>
            );
        }

        return this.state.items.map((item:IBlog) => {
            return this.renderItem(item);
        });
    }
  
    public render() {
      return (
          <div>
              <h2>Blogs</h2>
              {this.renderItems()}
          </div>
      );
    }
}
