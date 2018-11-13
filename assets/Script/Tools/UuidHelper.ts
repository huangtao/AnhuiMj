


//用于生成uuid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export class UuidHelper {
    public static getUuid(): string {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    public static getShortUuid(): string {
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    }

}