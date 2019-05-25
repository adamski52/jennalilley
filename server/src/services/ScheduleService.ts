import Schedule from "../models/Schedule";

export default class ScheduleService {
    public static async getById(id:string) {
        return await Schedule.findOne({
            _id: id
        });
    }

    public static async deleteById(id:string) {
        return await Schedule.deleteOne({
            _id: id
        });
    }

    public static async getAll() {
        return await Schedule.find();
    }

    
    public static async update(id:string, name: string, type: string, startDateTime: Date, endDateTime: Date, capacity: string, ageRestrictions: string, cost: string, location: string, description: string) {
        let schedule = await this.getById(id);
        if(!schedule) {
            return this.create(name, type, startDateTime, endDateTime, capacity, ageRestrictions, cost, location, description);
        }

        schedule.name = name;
        schedule.type = type;
        schedule.startDateTime = startDateTime;
        schedule.endDateTime = endDateTime;
        schedule.capacity = capacity;
        schedule.ageRestrictions = ageRestrictions;
        schedule.cost = cost;
        schedule.location = location;
        schedule.description = description;

        return schedule.save();
    }

    public static async create(name: string, type: string, startDateTime: Date, endDateTime: Date, capacity: string, ageRestrictions: string, cost: string, location: string, description: string) {
        return await Schedule.create({
            name,
            type,
            startDateTime,
            endDateTime,
            capacity,
            ageRestrictions,
            cost,
            location,
            description
        });
    }
}
