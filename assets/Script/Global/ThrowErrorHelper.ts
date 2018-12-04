import { Debug } from "../Tools/Function";


export class ThrowErrorHelper {
    public static error(e) {
        if (Debug()) {
            cc.error(e);
            return;
        }

        cc.warn(e);
    }
}