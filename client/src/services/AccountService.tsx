import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";
import { ISchedule } from "../interfaces/Schedule";

export default class AccountService {
    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/account").then((json) => {
            let events = json.events || [],
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
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load account information.");
        });
    }

    // this is intentional -- for undelete-able things, update calls post
    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/about", payload).then(() => {
            statusHandler(STATUS.SUCCESS, "About page updated successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to update about page.");
        });
    }
}