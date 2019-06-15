import mongoose, {Schema, Document} from "mongoose";
import { IRole, RoleSchema } from "./Role";

export interface IUser extends Document {
    name: String,
    email: String,
    providerName: String,
    providerId: String,
    roles: IRole[]
}

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    providerName: {
        type: String,
        required: true
    },

    providerId: {
        type: String,
        required: true
    },

    roles: [{
        type: RoleSchema,
        required: true
    }]
});

export default mongoose.model<IUser>("User", UserSchema);
