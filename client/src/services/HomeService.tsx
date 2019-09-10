import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class HomeService {
    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/home").then((response) => {
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to load home page.");
            throw e;
        });
    }

    // this is intentional -- for undelete-able things, update calls post
    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/home", payload).then((response) => {
            statusHandler(STATUS.SUCCESS, "Home page updated successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to update home page.");
            throw e;
        });
    }
}