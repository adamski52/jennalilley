import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class UserService {
    public static promote(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/users/" + payload._id + "/promote", payload).then((response) => {
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to promote user.");
            throw e;
        });
    }

    public static demote(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/users/" + payload._id + "/demote", payload).then((response) => {
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to demote user.");
            throw e;
        });
    }

    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/users").then((response) => {
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to load users.");
            throw e;
        });
    }

    public static delete(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.delete("/api/users/" + id).then((response) => {
            statusHandler(STATUS.SUCCESS, "User deleted successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to delete bluserog.");
            throw e;
        });
    }
}