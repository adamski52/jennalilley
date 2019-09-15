import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class UserService {
    public static async promote(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.put("/api/users/" + payload._id + "/promote", payload);
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to promote user.");
            throw e;
        }
    }

    public static async demote(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.put("/api/users/" + payload._id + "/demote", payload);
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to demote user.");
            throw e;
        }
    }

    public static async readAll(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/users");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load users.");
            throw e;
        }
    }

    public static async delete(statusHandler:ISetGlobalMessage, id:any) {
        try {
            let response = await HttpService.delete("/api/users/" + id);
            statusHandler(STATUS.SUCCESS, "User deleted successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to delete bluserog.");
            throw e;
        }
    }
}