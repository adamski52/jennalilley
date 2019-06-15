import Schedule from "../models/Schedule";
import BaseService from "./BaseService";

export default class ScheduleService extends BaseService {
    constructor() {
        super(Schedule);
    }

    // public async signup(user:IUser, schedule:ISchedule) {
    //     let signup = await SignUp.create({
    //         user: user,
    //         schedule: schedule,
    //         isPaid: false
    //     });
    //     return signup;
    // }
}
