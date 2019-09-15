import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";
import { ISchedule } from "../interfaces/Schedule";

export default class AccountService {
    public static async readAll(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/account"),
                events = response.events || [],
                today = new Date();

            events = events.filter((event: ISchedule) => {
                return event.startDateTime && event.startDateTime < today;
            }).sort((lhs: ISchedule, rhs: ISchedule) => {
                if (lhs.startDateTime != null && rhs.startDateTime != null) {
                    if (lhs.startDateTime < rhs.startDateTime) {
                        return -1;
                    }

                    if (lhs.startDateTime > rhs.startDateTime) {
                        return 1;
                    }
                }

                return 0;
            });

            return events;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load account information.");
            throw e;
        }
    }

    // this is intentional -- for undelete-able things, update calls post
    public static async update(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.post("/api/about", payload);
            statusHandler(STATUS.SUCCESS, "About page updated successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to update about page.");
            throw e;
        }
    }
}