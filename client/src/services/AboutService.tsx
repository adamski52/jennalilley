import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class AboutService {
    public static async readAll(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/about");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load about page.");
            throw e;
        };
    }

    // this is intentional -- for undelete-able things, update calls post
    public static async update(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = HttpService.post("/api/about", payload);
            statusHandler(STATUS.SUCCESS, "About page updated successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to update about page.");
            throw e;
        }
    }
}