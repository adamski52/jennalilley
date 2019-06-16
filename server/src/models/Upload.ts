import mongoose, {Schema, Document} from "mongoose";

export interface IUpload extends Document {
    data: string;
};

const UploadSchema: Schema = new Schema({
    data: {
        type: String,
        required: true
    }
});

export default mongoose.model<IUpload>("Upload", UploadSchema);
