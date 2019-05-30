import mongoose, {Schema, Document} from "mongoose";
import { ISchedule, ScheduleSchema } from "./Schedule";
import { IUser, UserSchema } from "./User";

export interface ISignUp extends Document {
    user: IUser;
    event: ISchedule;
    isPaid: boolean;
};

export const SignUpSchema: Schema = new Schema({
    user: {
        type: UserSchema,
        required: true
    },

    event: {
        type: ScheduleSchema,
        required: true
    },

    isPaid: {
        type: Boolean
    }
});

export default mongoose.model<ISignUp>("SignUp", SignUpSchema);
