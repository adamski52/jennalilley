import Contact from "../models/Contact";
import BaseService from "./BaseService";

export default class ContactService extends BaseService {
    constructor() {
        super(Contact);
    }
}
