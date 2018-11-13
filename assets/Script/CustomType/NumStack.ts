export class NumStack {
    private _array: Array<number>;
    private _length: number;
    public constructor(len: number) {
        this._length = len;
        this._array = new Array();
    }
    public get Num() {
        const str = this.NumStr;
        const num = parseInt(str);
        if (isNaN(num)) return 0;
        return num;
    }
    public get NumStr() {
        let str = ``;
        for (let i = 0; i < this._array.length; i++) {
            str += this._array[i];
        }
        return str;
    }

    public EnterNum(num: number) {
        if (this._array.length < this._length) {
            this._array.push(num);
        }
    }
    public DeleteNum() {
        if (this._array.length > 0) {
            this._array.pop();
        }
    }

    public Clear() {
        this._array.length = 0;
    }
}


export enum KeyValue {
    Key0 = 0,
    Key1 = 1,
    Key2 = 2,
    Key3 = 3,
    Key4 = 4,
    Key5 = 5,
    Key6 = 6,
    Key7 = 7,
    Key8 = 8,
    Key9 = 9,
    KeyDelete = 10,
    KeyClear = 11,
}