import fetch from "cross-fetch";
import Cookies from "js-cookie";

export default class HttpService {
    private static baseUrl = "";

    private static toJson(response:Response) {
        if(response.ok) {
            return response.json();
        }

        throw response;
    }

    public static get(url:string) {
        return fetch(this.baseUrl + url, {
            headers: {
                "Authorization": "JWT " + Cookies.get("TOKEN"),
                "Content-Type": "application/json"
            }
        }).then(this.toJson)
    }

    public static post(url:string, body:any) {
        return fetch(this.baseUrl + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Authorization": "JWT " + Cookies.get("TOKEN"),
                "Content-Type": "application/json"
            }
        }).then(this.toJson);
    }

    public static put(url:string, body:any) {
        return fetch(this.baseUrl + url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Authorization": "JWT " + Cookies.get("TOKEN"),
                "Content-Type": "application/json"
            }
        }).then(this.toJson);
    }

    public static delete(url:string) {
        return fetch(this.baseUrl + url, {
            method: "DELETE",
            headers: {
                "Authorization": "JWT " + Cookies.get("TOKEN"),
                "Content-Type": "application/json"
            }
        }).then(this.toJson);
    }
}