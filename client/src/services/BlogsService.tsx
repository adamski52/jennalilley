import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";
import { IBlog } from "../interfaces/Blog";

export default class BlogsService {
    public static readOne(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.get("/api/blogs/" + id).then((response) => {
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to load blog.");
            throw e;
        });
    }

    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/blogs").then((response) => {
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to load blogs.");
            throw e;
        });
    }

    public static readAllActive(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/blogs").then((json:IBlog[]) => {
            let items = json || [],
                today = new Date();

            items = items.filter((item) => {
                return item.startDateTime == null || item.startDateTime > today;
            }).filter((item) => {
                return item.endDateTime == null || item.endDateTime < today;
            }).sort((lhs, rhs) => {
                if(lhs.startDateTime != null && rhs.startDateTime != null) {
                    if(lhs.startDateTime < rhs.startDateTime) {
                        return -1;
                    }

                    if(lhs.startDateTime > rhs.startDateTime) {
                        return 1;
                    }
                }

                return 0;
            });

            return items;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to load blogs.");
            throw e;
        });
    }

    public static create(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/blogs", payload).then((response) => {
            statusHandler(STATUS.SUCCESS, "Blog created successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to create blog.");
            throw e;
        });
    }

    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/blogs/" + payload._id, payload).then((response) => {
            statusHandler(STATUS.SUCCESS, "Blog updated successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to update blog.");
            throw e;
        });
    }

    public static delete(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.delete("/api/blogs/" + id).then((response) => {
            statusHandler(STATUS.SUCCESS, "Blog deleted successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to delete blog.");
            throw e;
        });
    }
}