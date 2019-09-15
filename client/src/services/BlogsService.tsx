import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";
import { IBlog } from "../interfaces/Blog";

export default class BlogsService {
    public static async readOne(statusHandler:ISetGlobalMessage, id:any) {
        try {
            let response = await HttpService.get("/api/blogs/" + id);
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load blog.");
            throw e;
        }
    }

    public static async readAll(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/blogs");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load blogs.");
            throw e;
        }
    }

    public static async readAllActive(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/blogs"),
                items = response as IBlog[] || [],
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
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load blogs.");
            throw e;
        }
    }

    public static async create(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.post("/api/blogs", payload);
            statusHandler(STATUS.SUCCESS, "Blog created successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to create blog.");
            throw e;
        }
    }

    public static async update(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.put("/api/blogs/" + payload._id, payload);
            statusHandler(STATUS.SUCCESS, "Blog updated successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to update blog.");
            throw e;
        }
    }

    public static async delete(statusHandler:ISetGlobalMessage, id:any) {
        try {
            let response = await HttpService.delete("/api/blogs/" + id);
            statusHandler(STATUS.SUCCESS, "Blog deleted successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to delete blog.");
            throw e;
        }
    }
}