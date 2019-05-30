import React from "react";
import HttpService from "../../../util/HttpService";
import StatusBar, { STATUS } from "../../StatusBar";

export default class HomePage extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            userId: "5ce1da1cf192da26f60bf605",
            message: {
                type: "",
                message: ""
            }
        };
      
        this.doInsecure = this.doInsecure.bind(this);
        this.doSecure = this.doSecure.bind(this);
        this.doUsers = this.doUsers.bind(this);
        this.doUserById = this.doUserById.bind(this);
        this.doCreateUser = this.doCreateUser.bind(this);
        this.doDeleteById = this.doDeleteById.bind(this);
    }

    private doDeleteById() {
        HttpService.delete("/api/users/" + this.state.userId).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to delete user."
                }
            });
        })
      }
    
      private doCreateUser() {
          HttpService.post("/api/users", {
            name: "User Name",
            email: "lol@example.com",
            providerName: "jennalilley",
            providerId: 123
          }).catch(() => {
              this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to create user."
                }
            });
        });
      }
    
      private doUsers() {
          HttpService.get("/api/users").catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to fetch users."
                }
            });
          });
      }
    
      private doUserById() {
        HttpService.get("/api/users/" + this.state.userId).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to fetch user."
                }
            });
        });
      }
    
      private doInsecure() {
          HttpService.get("/api/insecure").then(() => {
            this.setState({
                message: {
                    type: STATUS.SUCCESS,
                    message: "got insecure data."
                }
            });
          }).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to fetch insecure data."
                }
            });
        });
      }
    
      private doSecure() {
        HttpService.get("/api/secure").then(() => {
            this.setState({
                message: {
                    type: STATUS.SUCCESS,
                    message: "got secure data."
                }
            });
          }).catch(() => {
            this.setState({
                message: {
                    type: STATUS.ERROR,
                    message: "Failed to fetch seccure data."
                }
            });
        });
      }

    public render() {
        return (
            <div>
                <StatusBar {...this.state.message} />
                <a href="http://localhost:8080/api/auth/facebook/start">Login with Facebook</a>
                <a href="http://localhost:8080/api/auth/google/start">Login with Google</a>
                <button onClick={this.doInsecure}>Insecure</button>
                <button onClick={this.doSecure}>Secure</button>
                <button onClick={this.doUsers}>Users</button>
                <button onClick={this.doUserById}>User by ID</button>
                <button onClick={this.doDeleteById}>Delete by ID</button>
                <input onChange={(e) => {
                    this.setState({
                        userId: e.target.value
                    });
                }} defaultValue={this.state.userId} />

                <button onClick={this.doCreateUser}>Create User</button>
            </div>
        );
    }
}
