import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class ContactService {
    public static async readAll(statusHandler:ISetGlobalMessage) {
        try {
            let response = await HttpService.get("/api/contact");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to load contact information.");
            throw e;
        }
    }

    // this is intentional -- for undelete-able things, update calls post
    public static async update(statusHandler:ISetGlobalMessage, payload:any) {
        try {
            let response = await HttpService.post("/api/contact", payload);
            statusHandler(STATUS.SUCCESS, "Contact information updated successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to update contact information.");
            throw e;
        }
    }

    private static isPayloadValid(statusHandler:ISetGlobalMessage, payload:any) {
        if(!payload.nameRef.current || !payload.nameRef.current.value) {
            statusHandler(STATUS.ERROR, "Please provide your name.");
            return false;
        }

        if(!payload.emailRef.current || !payload.emailRef.current.value) {
            statusHandler(STATUS.ERROR, "Please provide your email address.");
            return false;
        }
        
        if(payload.emailRef.current.value.indexOf("@") < 0 || payload.emailRef.current.value.indexOf(".") < 0) {
            statusHandler(STATUS.ERROR, "Please provide a valid email address.");
            return false;
        }
        
        if(!payload.messageRef.current || !payload.messageRef.current.value) {
            statusHandler(STATUS.ERROR, "Please provide your message.");
            return false;
        }

        return true;
    }

    public static async sendEmail(statusHandler:ISetGlobalMessage, payload:any) {
        if(!this.isPayloadValid(statusHandler, payload)) {
            return;
        }

        try {
            let email = {
                name: payload.nameRef.current.value,
                email: payload.emailRef.current.value,
                message: payload.messageRef.current.value
            };

            let response = await HttpService.post("/api/email", email);
            statusHandler(STATUS.SUCCESS, "Email sent successfully.");
            return response;
        }
        catch(e) {
            statusHandler(STATUS.ERROR, "Failed to send email.  Please try again.");
            throw e;
        }
    }
}
