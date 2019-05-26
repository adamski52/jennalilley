import mongoose, {Schema, Document} from "mongoose";

export interface IBlog extends Document {
    title: string;
    content: string;
    startDateTime: Date;
    endDateTime: Date | null;
};

const BlogSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    startDateTime: {
        type: Date
    },

    endDateTime: {
        type: Date
    }
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
