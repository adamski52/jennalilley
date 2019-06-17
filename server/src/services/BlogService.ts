import Blog from "../models/Blog";
import BaseService from "./BaseService";
import { Model } from "mongoose";
import { IBase } from "../models/Base";

export default class BlogService extends BaseService {
    constructor(model:Model<IBase> = Blog) {
        super(model);
    }
}
