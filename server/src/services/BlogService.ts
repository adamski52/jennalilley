import Blog from "../models/Blog";

export default class ScheduleService {
    public static async getById(id:string) {
        return await Blog.findOne({
            _id: id
        });
    }

    public static async deleteById(id:string) {
        return await Blog.deleteOne({
            _id: id
        });
    }

    public static async getAll() {
        return await Blog.find();
    }

    
    public static async update(id:string, title: string, startDateTime: Date, endDateTime: Date, content: string) {
        let blog = await this.getById(id);
        if(!blog) {
            return this.create(title, startDateTime, endDateTime, content);
        }

        blog.title = title;
        blog.startDateTime = startDateTime;
        blog.endDateTime = endDateTime;
        blog.content = content;

        return blog.save();
    }

    public static async create(title: string, startDateTime: Date, endDateTime: Date, content: string) {
        let blog = await Blog.create({
            title: title,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            content: content
        });

        return blog;
    }
}
