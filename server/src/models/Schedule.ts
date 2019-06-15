import mongoose, {Schema, Document} from "mongoose";

export interface ISchedule extends Document {
    name: string,
    type: string,
    startDateTime: Date | null,
    endDateTime: Date | null,
    capacity: string,
    ageRestrictions: string,
    cost: string,
    location: string,
    description: string
};

export const ScheduleSchema: Schema = new Schema({
    name: {
        type: String
    },

    type: {
        type: String
    },

    startDateTime: {
        type: Date
    },

    endDateTime: {
        type: Date
    },

    capacity: {
        type: String
    },

    ageRestrictions: {
        type: String
    },

    cost: {
        type: String
    },

    location: {
        type: String
    },

    description: {
        type: String
    }
});

export default mongoose.model<ISchedule>("Schedule", ScheduleSchema);
