import React from "react";
import { BlogViewAllProps, BlogViewAllState } from "../../../states/Blogs";
import { IBlog } from "../../../interfaces/Blog";
import BlogsService from "../../../services/BlogsService";

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

    private async onFetch() {
        try {
            let json = await BlogsService.readAllActive(this.props.setGlobalMessage);
            this.setState({
                items: json as IBlog[]
            });
        }
        catch(e) {
            this.setState({
                items: []
            });
        }
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
                <div className="note">
                    <p>There are currently no blog postings.</p>
                </div>
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
