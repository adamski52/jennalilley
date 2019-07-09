import mongoose, {Schema, Document} from "mongoose";

export interface IEmail extends Document {
    message: string;
    email: string;
    name: string;
};

const EmailSchema: Schema = new Schema({
    message: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<IEmail>("Email", EmailSchema);
