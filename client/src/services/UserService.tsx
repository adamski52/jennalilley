import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class UserService {
    public static readOne(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.get("/api/blogs/" + id).then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load blog.");
        });
    }

    public static promote(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/users/" + payload._id + "/promote", payload).then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to promote user.");
        });
    }

    public static demote(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/users/" + payload._id + "/demote", payload).then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to demote user.");
        });
    }

    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/blogs").then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load blogs.");
        });
    }

    public static create(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/blogs", payload).then(() => {
            statusHandler(STATUS.SUCCESS, "Blog created successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to create blog.");
        });
    }

    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/blogs/" + payload._id, payload).then(() => {
            statusHandler(STATUS.SUCCESS, "Blog updated successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to update blog.");
        });
    }

    public static delete(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.delete("/api/blogs/" + id).then(() => {
            statusHandler(STATUS.SUCCESS, "Blog deleted successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to delete blog.");
        });
    }
}