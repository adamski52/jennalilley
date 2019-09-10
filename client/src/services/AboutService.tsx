import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class AboutService {
    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/about").then((response) => {
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to load about page.");
            throw e;
        });
    }

    // this is intentional -- for undelete-able things, update calls post
    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/about", payload).then((response) => {
            statusHandler(STATUS.SUCCESS, "About page updated successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to update about page.");
            throw e;
        });
    }
}