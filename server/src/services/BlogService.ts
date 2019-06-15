import Blog from "../models/Blog";
import BaseService from "./BaseService";

export default class BlogService extends BaseService {
    constructor() {
        super(Blog);
    }
}
