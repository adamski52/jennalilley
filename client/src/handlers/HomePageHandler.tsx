import { Dispatch } from "redux";
import HttpService from "../util/HttpService";
import GlobalHandler from "./GlobalHandler";

export default class HomePageHandler {
    static INITIAL_STATE = {
        content: ""
    };

    static ACTIONS = {
        FETCH_SUCCESS: "HOME_FETCH_SUCCESS"
    };

    static METHODS = {
        fetch: (dispatch:Dispatch) => {
            return HttpService.get("/api/home").then((json) => {
                dispatch({
                    type: HomePageHandler.ACTIONS.FETCH_SUCCESS,
                    content: json
                });
            }).catch(() => {
                dispatch({
                    type: GlobalHandler.ACTIONS.STATUS,
                    status: {
                        message: "Failed to fetch home content.",
                        type: "ERROR"
                    }
                });
            });
        }
    };

    static REDUCER(state = HomePageHandler.INITIAL_STATE, action:any) {
        switch(action.type) {
            case HomePageHandler.ACTIONS.FETCH_SUCCESS:
                return {
                    ...state,
                    content: action.content
                };
            default:
                return state;            
        }
    }
}