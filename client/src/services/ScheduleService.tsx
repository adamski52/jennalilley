import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";
import { ISchedule } from "../interfaces/Schedule";

export default class ScheduleService {
    public static async readOne(statusHandler:ISetGlobalMessage, id:any) {
        try {
            let response = await HttpService.get("/api/schedule/" + id);
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load event.");
            throw e;
        }
    }

    public static async readAll(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/schedule");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load events.");
            throw e;
        }
    }

    public static async readAllActive(statusHandler:ISetGlobalMessage) {
        try { 
            let response = await HttpService.get("/api/schedule"),
                items:ISchedule[] = response || [],
                today = new Date();

            items = items.filter((item) => {
                return item.startDateTime && item.startDateTime < today;
            }).sort((lhs:ISchedule, rhs:ISchedule) => {
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
            statusHandler(STATUS.ERROR, "Failed to load events.");
            throw e;
        }
    }

    public static async create(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.post("/api/schedule", payload);
            statusHandler(STATUS.SUCCESS, "Event created successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to create event.");
            throw e;
        }
    }

    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/schedule/" + payload._id, payload).then((response) => {
            statusHandler(STATUS.SUCCESS, "Event updated successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to update event.");
            throw e;
        });
    }

    public static delete(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.delete("/api/schedule/" + id).then((response) => {
            statusHandler(STATUS.SUCCESS, "Event deleted successfully.");
            return response;
        }).catch((e) => {
            statusHandler(STATUS.ERROR, "Failed to delete event.");
            throw e;
        });
    }
}