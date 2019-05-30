import { RefObject } from "react";

export default class RefUtil {
    public static getValue(ref:RefObject<HTMLInputElement | HTMLTextAreaElement | null>, val:string) {
        return ref.current ? ref.current.value : val;
    }
}