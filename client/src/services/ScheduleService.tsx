import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";
import { ISchedule } from "../interfaces/Schedule";

export default class ScheduleService {
    public static readOne(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.get("/api/schedule/" + id).then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load event.");
        });
    }

    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/schedule").then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load events.");
        });
    }

    public static readAllActive(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/schedule").then((json:ISchedule[]) => {
            let items = json || [],
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
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load events.");
        });
    }

    public static create(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/schedule", payload).then(() => {
            statusHandler(STATUS.SUCCESS, "Event created successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to create event.");
        });
    }

    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.put("/api/schedule/" + payload._id, payload).then(() => {
            statusHandler(STATUS.SUCCESS, "Event updated successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to update event.");
        });
    }

    public static delete(statusHandler:ISetGlobalMessage, id:any) {
        return HttpService.delete("/api/schedule/" + id).then(() => {
            statusHandler(STATUS.SUCCESS, "Event deleted successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to delete event.");
        });
    }
}