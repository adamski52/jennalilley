import mongoose, {Schema, Document} from "mongoose";

export interface IHome extends Document {
    content: string;
};

const HomeSchema: Schema = new Schema({
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model<IHome>("About", HomeSchema);
