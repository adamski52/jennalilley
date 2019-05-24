import mongoose, {Schema, Document} from "mongoose";

export interface IRole extends Document {
    name: String
}

export const RoleSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<IRole>("Role", RoleSchema);
