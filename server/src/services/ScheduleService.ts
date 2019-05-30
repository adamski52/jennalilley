import Schedule, { ISchedule } from "../models/Schedule";
import BaseService from "./BaseService";
import { IUser } from "../models/User";
import SignUp from "../models/SignUp";

export default class ScheduleService extends BaseService {
    constructor() {
        super(Schedule);
    }

    public async signup(user:IUser, schedule:ISchedule) {
        let signup = await SignUp.create({
            user: user,
            schedule: schedule,
            isPaid: false
        });

        return signup;
    }
}
