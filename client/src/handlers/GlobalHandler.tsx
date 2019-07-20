export default class GlobalHandler {
    static INITIAL_STATE = {
        authentication: {
            isAdmin: false,
            isAuthenticated: false
        },
        status: {
            message: "",
            type: ""
        }
    };

    static ACTIONS = {
        STATUS: "STATUS_CHANGE"
    };

    static REDUCER(state = GlobalHandler.INITIAL_STATE, action:any) {
        switch(action.type) {
            case GlobalHandler.ACTIONS.STATUS:
                return {
                    ...state,
                    status: action.status
                };
            default:
                return state;
        }
    }
}