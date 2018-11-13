/**
 *
 * @author 
 *
 */
import { IDispose } from "../Interface/IDispose"; 

export interface IObject {
    get_TypeCode(): string;
    FullName(): string;
}
/**
 * 所有消息实体类的最终基类，它是所有实体消息类的根
 */
export class UyiObject implements IObject, IDispose {

    /**
     * 是否有效
     */
    private _isValid: boolean = true;
    public $T: string = ""

    /**
     * 是否有效
     */
    public get isValid(): boolean {
        return this._isValid;
    }
    get_TypeCode(): string {
        return this.FullName();
    }
    FullName(): string {
        return this.$T;
    }
    Dispose(): void {
        this._isValid = false;
    } 
}
