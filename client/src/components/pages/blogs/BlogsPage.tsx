import React from "react";
import HttpService from "../../../util/HttpService";
import { BlogViewAllProps, BlogViewAllState } from "../../states/Blogs";
import StatusBar, { STATUS } from "../../StatusBar";

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
        HttpService.get("/api/blogs/").then((json) => {
            this.setState({
                items: json
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

    private renderItem(item:any) {
        return (
          <div className="row" key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.startDateTime}</p>
              <div dangerouslySetInnerHTML={{__html: item.content}} />
          </div>
        );
    }
  
    private renderItems() {
        return this.state.items.map((item:any) => {
            return this.renderItem(item);
        });
    }
  
    public render() {
      return (
        <div className="main-content">
              <StatusBar {...this.state.message} />
              <div className="col-12">
                  {this.renderItems()}
              </div>
          </div>
      );
    }
}
