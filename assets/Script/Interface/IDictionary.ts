export interface IDictionary<TKey extends string | number, TValue> {

    /**
     * 总数
     */
    readonly Count: number;

    /**
     * 键集合
     */
    readonly Keys: Array<TKey>;

    /**
     * 值集合
     */
    readonly Values: Array<TValue>;

    /**
     * 获取值
     */
    GetValue(key: TKey): TValue;

    /**
     * 增加一个
     */
    Add(key: TKey, value: TValue): number;

    /**
     * 增加或更新
     */
    AddOrUpdate(key: TKey, value: TValue): number;

    /**
     * 移除一个
     */
    Remove(key: TKey): number

    /**
     * 是否存在
     */
    Contains(key: TKey): boolean;

    /**
     * 清除
     */
    Clear(): void;

    /**
     * 转换成json
     */
    ToJson(): string;

    /**
     * 转换成url
     */
    ToUrl(): string;
}