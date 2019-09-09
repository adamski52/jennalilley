import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";
import { IBlog } from "../interfaces/Blog";

export default class BlogsService {
    public static readOne(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.get("/api/blogs/" + id).then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load blog.");
        });
    }

    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/blogs").then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load blogs.");
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