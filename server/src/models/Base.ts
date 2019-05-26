import mongoose, {Schema, Document} from "mongoose";

export interface IBase extends Document {};

const BaseSchema: Schema = new Schema();

export default mongoose.model<IBase>("Base", BaseSchema);
