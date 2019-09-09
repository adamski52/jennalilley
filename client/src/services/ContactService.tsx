import HttpService from "./HttpService";
import { ISetGlobalMessage } from "../interfaces/Global";
import { STATUS } from "../components/StatusBar";

export default class ContactService {
    public static readAll(statusHandler:ISetGlobalMessage) {
        return HttpService.get("/api/contact").then((json) => {
            return json;
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to load contact information.");
        });
    }

    // this is intentional -- for undelete-able things, update calls post
    public static update(statusHandler:ISetGlobalMessage, payload:any) {
        return HttpService.post("/api/contact", payload).then(() => {
            statusHandler(STATUS.SUCCESS, "Contact information updated successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to update contact information.");
        });
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

    public static sendEmail(statusHandler:ISetGlobalMessage, payload:any) {
        if(!this.isPayloadValid(statusHandler, payload)) {
            return;
        }
        
        let email = {
            name: payload.nameRef.current.value,
            email: payload.emailRef.current.value,
            message: payload.messageRef.current.value
        };

        return HttpService.post("/api/email", email).then(() => {
            statusHandler(STATUS.SUCCESS, "Email sent successfully.");
        }).catch(() => {
            statusHandler(STATUS.ERROR, "Failed to send email.  Please try again.");
        });
    }
}
