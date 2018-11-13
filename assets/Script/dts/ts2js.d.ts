

declare function MathaccAdd(arg1: any, arg2: any): number
declare function MathaccSub(arg1: any, arg2: any): number
declare function MathaccMul(arg1: any, arg2: any): number
declare function MathaccDiv(arg1: any, arg2: any): number
//declare var Promise: PromiseConstructor;

//interface PromiseConstructor {
//}

/**
 * 获取当前分站配置
 * */
declare function getWebConfig(): any;
/*
 * 获取参数配置
 * */
declare function getUrlQueryData(): any;
/**
 * 拉起浏览器支付接口
 */
declare function runWebBrowserRequest(req: any): any;
/**
 * 获取浏览器平台
 * */
//declare function getPlatfromInfo(): any;
/**
 * 获取游戏包ID/血战麻将包/大厅包/德州扑克包
 * @returns {} 
 */
declare function GetGamePackageID(): number;

/**
 * 获取是否为测试站 0为正式站 其余为各种分站
 * @returns {} 
 */
declare function getIsTestSite(): number;

/**
 * 获取区名称 anhui1/yunnan1
 * @returns {} 
 */
declare function getRegionName(): string;


/**
 * 获取资源版本号
 * @returns {} 
 */
declare function getResVersion(): string;
/**
 * 获取js版本号
 * @returns {} 
 */
declare function getJsVersion(): string;



/**
 *
 * @returns {} 
 */
declare function CustomerService(): string;

/**
 * 
 * @param cname 
 * @param cvalue 
 * @param exdays 
 * @returns {} 
 */
declare function setCookie(cname, cvalue, exdays): void;


declare function require(src): void;

/**
 * 加载一个js脚本
 * @param path
 * @param callback
 * @param o
 */
declare function GameLoadJsProceeer(path, callback, o): void;

declare class Uyi {
    static DebugNetAddress: string;
}
declare class JSEncrypt {
    setPublicKey(pk: string): void;
    encrypt(pk: string): string;
}

declare class NIM {
    static getInstance(option: any): NIM;
}
