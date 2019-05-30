import mongoose, {Schema, Document} from "mongoose";

export interface IContact extends Document {
    content: string;
    email: string;
    phone: string;
    facebook: string;
    twitter: string;
    instagram: string;
};

const ContactSchema: Schema = new Schema({
    content: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    phone: {
        type: String
    },

    facebook: {
        type: String
    },

    twitter: {
        type: String
    },

    instagram: {
        type: String
    }

});

export default mongoose.model<IContact>("Contact", ContactSchema);
