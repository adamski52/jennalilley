import mongoose, {Schema, Document} from "mongoose";
import { ISchedule, ScheduleSchema } from "./Schedule";
import { IUser, UserSchema } from "./User";

export interface ISignup extends Document {
    user: IUser;
    event: ISchedule;
};

export const SignupSchema: Schema = new Schema({
    user: {
        type: UserSchema,
        required: true
    },

    event: {
        type: ScheduleSchema,
        required: true
    }
});

export default mongoose.model<ISignup>("Signup", SignupSchema);
