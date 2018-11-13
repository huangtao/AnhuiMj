

import { IDictionary } from "../Interface/IDictionary";

export default class Dictionary<TKey extends string | number, TValue> implements IDictionary<TKey, TValue> {


    private _keys: Array<TKey>;
    private _values: Array<TValue>;


    /**
     * 获取长度
     */
    public get Count(): number {
        return this._keys.length;
    }
    /**
     * 获取全部键
     * */
    public get Keys(): Array<TKey> {
        return this._keys;
    }

    /**
     * 设置键值
     * */
    public set Keys(keys){
        if (!keys) {
            return;
        }

        this._keys = keys;
    }

    /**
     * 获取全部值
     * */
    public get Values(): Array<TValue>{
        return this._values;
    }

    /**
     * 获取全部值
     * */
    public set Values(values){
        if (!values) {
            return;
        }

        this._values = values;
    }


    public constructor() {
        this._keys = new Array();
        this._values = new Array();
    }


    /**
     * 交换两个键值对的顺序
     */
    public swapKeyValue(key1: TKey, key2: TKey): void{
       if (!cc.isValid(key1) || !cc.isValid(key2)) {
           return;
       }

       let key1Index = this._keys.indexOf(key1);
       let key2Index = this._keys.indexOf(key2);

       let tmpValue = this.GetValue(key1);
       this._values[key1Index] = this.GetValue(key2);
       this._values[key2Index] = tmpValue;

       this._keys[key2Index] = key1;
       this._keys[key1Index] = key2;
     }

    /**
     * 从集合中获取一个值
     * @param key 键
     */
    public GetValue(key: TKey): TValue {
        // if (!key) {
        //     throw new Error("无效的键");
        // }

        const idx = this._keys.indexOf(key);
        if (idx >= 0) {
            return this._values[idx];
        }
        return null;
    }

    /**
     * 向集合中增加一个键值对
     * @param key 键
     * @param value 值
     */
    public Add(key: TKey, value: TValue): number {
        // if (!key) {
        //     throw new Error("无效的键");
        // }

        if (this._keys.indexOf(key) >= 0) {
            throw new Error("已存在的键，如果需要覆盖请使用AddOrUpdate");
        }

        this._keys.push(key);
        this._values.push(value);
        return this._keys.length;
    }

    /**
    * 向集合中增加或更新一个键值对
    * @param key 键
    * @param value 值
    */
    public AddOrUpdate(key: TKey, value: TValue): number {
        // if (key == null) {
        //     throw new Error("无效的键");
        // }
        const idx = this._keys.indexOf(key);
        if (idx >= 0) {
            this._values[idx] = value;
        } else {
            this.Add(key, value);
        }
        return this._keys.length;
    }

    /**
    * 拼接两个集合（第一个集合在前，后面一个集合在后)
    * @param key 键
    * @param value 值
    */
    public Concat(dict: Dictionary<TKey,TValue>): Dictionary<TKey,TValue> {
        if (!dict|| 0 == dict.Count ) {
            return;
        }

        let keys = this.Keys.concat(dict.Keys);
        let values = this._values.concat(dict.Values);
        let tmpDict = new Dictionary<TKey,TValue>();
        tmpDict.Keys = keys;
        tmpDict.Values = values;
        return tmpDict;
    }

    /**
     * 移除一个值
     * @param key 键
     */
    public Remove(key: TKey): number {
        // if (null == key) {
        //     throw new Error("无效的键");
        // }

        const idx = this._keys.indexOf(key);

        if (idx >= 0) {//有这个键才去处理它
            this._keys.splice(idx, 1);
            this._values.splice(idx, 1);
        }
        return this._keys.length;
    }
    public Contains(key: TKey): boolean {
        // if (!key) {
        //     throw new Error("无效的键");
        // }
        return this._keys.indexOf(key) >= 0;
    }

    /**
     * 清除
     */
    public Clear(): void {
        this._keys.length = 0;
        this._values.length = 0;
    }

    /**
     * 转换为Json字符串
     */
    public ToJson(): string {
        const obj = {};
        for (let i = 0; i < this._keys.length; i++) {
            obj[this._keys.toString()] = this._values[i];
        }
        return JSON.stringify(obj);;
    }

    /**
     * 转换为Url参数
     */
    public ToUrl(): string {
        let param = "";
        if (this._keys.length === 0) return param;
        for (let i = 0; i < this._keys.length; i++) {
            if (i > 0) {
                param += "&";
            }
            const str = `${this._keys[i]}=${encodeURIComponent(this._values[i].toString())}`
            param += str;
        }
        return param;
    }
    public static Create<K extends string | number, V>(): Dictionary<K, V> {
        return new Dictionary<K, V>();
    }
}