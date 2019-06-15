import BaseCrudRouter from "./BaseCrudRouter";
import UserService from "../services/UserService";
import ScheduleService from "../services/ScheduleService";

export default class ScheduleRouter extends BaseCrudRouter {
    constructor(userService:UserService = new UserService(), scheduleService:ScheduleService = new ScheduleService()) {
        super(userService, scheduleService);
        // // this.router.get("/:id", passport.authenticate(["jwt"], {
        //     // session: false
        //     this.router.post("/:id/signup", async (req:Request, res:Response) => {
        //         try {
        //             let item = await scheduleService.getById(req.params.id) as ISchedule;

        //             if(!item) {
        //                 return res.status(400).json();
        //             }

        //             try {
        //                 let user = await this.userService.getUserById(req.body.user._id);

        //                 if(!user) {
        //                     return res.status(400).json();
        //                 }

        //                 let signup = await scheduleService.signup(user, item);
        //                 return res.json(signup);

        //             }
        //             catch(e) {
        //                 return res.status(400).json();
        //             }
        //         }
        //         catch(e) {
        //             return res.status(401).json();
        //         }
        //     });
    }
}
   
