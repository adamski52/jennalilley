import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class AboutService {
    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/about").then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load about page.");
        });
    }

    // this is intentional -- for undelete-able things, update calls post
    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/about", payload).then(() => {
            statusHandler(STATUS.SUCCESS, "About page updated successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to update about page.");
        });
    }
}