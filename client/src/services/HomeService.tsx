import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class HomeService {
    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/home").then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load home page.");
        });
    }

    // this is intentional -- for undelete-able things, update calls post
    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/home", payload).then(() => {
            statusHandler(STATUS.SUCCESS, "Home page updated successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to update home page.");
        });
    }
}