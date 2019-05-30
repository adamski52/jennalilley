import mongoose, {Schema, Document} from "mongoose";

export interface IAbout extends Document {
    content: string;
};

const AboutSchema: Schema = new Schema({
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model<IAbout>("About", AboutSchema);
