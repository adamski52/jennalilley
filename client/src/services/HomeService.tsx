import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class HomeService {
    public static async readAll(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/home");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load home page.");
            throw e;
        }
    }

    // this is intentional -- for undelete-able things, update calls post
    public static async update(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.post("/api/home", payload);
            statusHandler(STATUS.SUCCESS, "Home page updated successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to update home page.");
            throw e;
        }
    }
}