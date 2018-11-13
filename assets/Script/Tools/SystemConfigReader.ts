import { QL_Common } from "../CommonSrc/QL_Common";


export namespace Tools {


    /**
     * 键值对数据的读取器
     */
    export class SystemConfigReader {

        /**
         * 
         * @param data 获取一个键值对数据的读取器对象
         */
        static Parse(data?: QL_Common.KeyValueData[]): any {

            let r = {};
            if (!data) return r;

            for (let i in data) {
                let item = data[i];
                if (!item) continue;

                let key = item.Key;
                let value = item.Value;

                if (!key || !value || key.length <= 0 || value.length <= 0) continue;

                r[key] = value;
            }

            return r;
        }
    }
}