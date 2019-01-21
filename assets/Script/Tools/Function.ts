import ConfigData from "../Global/ConfigData";
import { QL_Common } from "../CommonSrc/QL_Common";
import Global from "../Global/Global";
import { EventCode } from "../Global/EventCode";
import { ShareParamExpands } from "../CustomType/ShareParam";
import { NativeCtrl } from "../Native/NativeCtrl";
import { PackageType } from "../CustomType/PackageType";
import AutoFit from "../AutoFit";
import { AudioType } from "../CustomType/Enum";


/**
 * 判断是不是Debug
 */
export function Debug() {

    //如果存在ccdebug字段，则可以直接使用
    if (typeof CC_DEBUG !== 'undefined') {
        return CC_DEBUG;
    }

    //如果是在浏览器中，
    if (cc.sys.isBrowser) {
        //存在getWebConfig这个方法，则可以认定为release
        if (typeof getWebConfig !== 'undefined') {
            return false;
        }
        //不存在，则为debug
        return true;
    }
    //如果是在native中，如果能够获取到启动热更新的字段currentVersion，则设置release，否则设置
    var currentVersion = cc.sys.localStorage.getItem("currentVersion");
    if (currentVersion == null) {
        return true;
    }
    return false;
}

/**
 * 
 * @param src 拷贝对象
 */
export function deepCopy(src: any) {

    let objtype = typeof src;
    switch (objtype) {
        case "string":
        case "number":
        case "undefined":
        case "boolean":
            return src;
    }

    let newobj = {};
    for (let i in src) {
        newobj[i] = deepCopy(src[i])
    }
    return newobj;
}

/**
 * 是否是测试分区
 */
export function IsIOS() {
    return cc.sys.platform === cc.sys.IPAD || cc.sys.platform === cc.sys.IPHONE;
}

/**
 * 是否是测试分区
 */
export function IsTest() {
    return ConfigData.RegionName === "test" || ConfigData.RegionName === "ceshi";
}
export function CurrentPackageType(): PackageType {

    switch (ConfigData.RegionName) {
        case "test":
        case "ceshi":
            return PackageType.Debug;
        case "review":
            return PackageType.Preview;
        default:
            return PackageType.Release;

    }
}

export function QueryAIFace(id: string) {
    return `${ConfigData.resWebUrl}/h5res/aiface/aiface_${id}.png`;
}

export function LoadImage(url: string, img: cc.Sprite) {
    //如果头像不存在，设置为默认头像http://
    if (!url || url.length <= 7) {
        url = ConfigData.defaultHeader;
    }

    if (!cc.isValid(img)) {
        return;
    }

    let frame = Global.Instance.DataCache.ImgTexture.GetValue(url);
    if (cc.isValid(frame)) {
        cc.log("头像已经存在，使用缓存的头像信息");
        let node = img.node;

        // 设置尺寸为初始尺寸
        if (node) {
            let nodeSize = node.getContentSize();
            let preSize = cc.size(nodeSize.width, nodeSize.height);
            img.spriteFrame = frame;//new cc.SpriteFrame(texture);
            node.setContentSize(preSize);
        }

        return;
    }

    const fun = (texture) => {
        if (!cc.isValid(texture)) {
            return;
        }

        Global.Instance.DataCache.ImgTexture.AddOrUpdate(url, new cc.SpriteFrame(texture));
        if (!cc.isValid(img)) {
            return;
        }

        let node = img.node;
        let preSize = null;

        // 设置尺寸为初始尺寸
        if (node) {
            let nodeSize = node.getContentSize();
            preSize = cc.size(nodeSize.width, nodeSize.height);
            img.spriteFrame = new cc.SpriteFrame(texture);
            node.setContentSize(preSize);
        }

    };

    let resource;
    if (EndWiths(url, ".png")) {
        resource = url;
    } else {
        resource = { url: url, type: 'png' };
    }

    cc.loader.load(resource, (err, texture) => {
        if (err) {
            cc.error(err);
            cc.loader.load(resource, (err, texture) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                fun(texture);
            });
            return;
        }
        fun(texture);
    });
}
export function LoadResourcesImage(url: string, img: cc.Sprite) {

    if (!cc.isValid(img)) {
        return;
    }
    const fun = (spriteFrame) => {
        if (!cc.isValid(img)) {
            return;
        }
        img.spriteFrame = spriteFrame;

    };
    cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame: cc.SpriteFrame) => {
        if (err) {
            cc.error(err);
            cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                fun(spriteFrame);
            });
            return;
        }
        fun(spriteFrame);
    });
}
/**
 * 
 * @param component 
 */
export function ReflushNodeWidgetAlignment(component: cc.Component, callback?: Function) {
    if (!cc.isValid(component)) return;


    //设置组件节点的可见性，防止弹出时会有适配闪烁的情况
    component.node.opacity = 0;
    //延迟到下一帧操作
    component.scheduleOnce(() => {
        //显示组件的可见性
        component.node.opacity = 255;
        let widgetArray = component.getComponents<cc.Widget>(cc.Widget)
            .concat(component.getComponentsInChildren<cc.Widget>(cc.Widget));
        for (let w of widgetArray) {
            if (cc.isValid(w)) {
                w.updateAlignment();
            }
        }

        let autoFixArray = component.getComponents<AutoFit>(AutoFit)
            .concat(component.getComponentsInChildren<AutoFit>(AutoFit));

        for (let w of autoFixArray) {
            if (cc.isValid(w)) {
                w.OnFrameSizeChanged();
            }
        }
        if (cc.isValid(callback)) {
            callback();
        }
    }, 0);
}
export function CheckNativeApiVersion(minVersion: number): boolean {
    let n_version = ConfigData.NativeApiVersion;
    cc.log(`n_version = ${n_version}`);
    if (ConfigData.NativeApiVersion < minVersion) {
        let durl = ConfigData.PkgDownloadURI;
        cc.log(`durl = ${durl}`);
        if (cc.isValid(durl) && durl.length > 0) {
            // NativeAPI必须大于等于2
            Global.Instance.UiManager.ShowMsgBox("需要下载最新的游戏包才可以使用该功能", this, () => {
                cc.sys.openURL(ConfigData.PkgDownloadURI);
            });
        }
        return false;
    }
    return true;
}


/**
 * 加载头像
 * @param url 头像url
 * @param img 图片实体
 */
export function LoadHeader(url: string, img: cc.Sprite) {
    LoadImage(url, img);
}


export function AddListener(btn: cc.Button, target: cc.Node, component: string, method: string, data: string = "") {
    if (!cc.isValid(btn)) {
        cc.warn("按钮组件无效")
        return;
    }
    if (!cc.isValid(target)) {
        cc.warn("事件node无效")
        return;
    }
    const c = target.getComponent(component);
    if (!cc.isValid(c)) {
        cc.warn("节点不存在component：" + component)
        return;
    }
    if (typeof c[method] !== "function") {
        cc.warn("component不存在方法：" + method)
        return;
    }
    const handler = new cc.Component.EventHandler();
    handler.target = target;
    handler.component = component;
    handler.handler = method;
    handler.customEventData = data;
    if (!btn.clickEvents) {
        btn.clickEvents = new Array();
    }
    btn.clickEvents.push(handler);
}
export function AddTListener(btn: cc.Toggle, target: cc.Node, component: string, method: string, data: string = "") {
    if (!cc.isValid(btn)) {
        cc.warn("按钮组件无效")
        return;
    }
    if (!cc.isValid(target)) {
        cc.warn("事件node无效")
        return;
    }
    const c = target.getComponent(component);
    if (!cc.isValid(c)) {
        cc.warn("节点不存在component：" + component)
        return;
    }
    if (typeof c[method] !== "function") {
        cc.warn("component不存在方法：" + method)
        return;
    }
    const handler = new cc.Component.EventHandler();
    handler.target = target;
    handler.component = component;
    handler.handler = method;
    handler.customEventData = data;
    if (!btn.checkEvents) {
        btn.checkEvents = new Array();
    }
    btn.checkEvents.push(handler);
}


/**
 * 把一个object转换为aaa=111&bbb=111的形式
 * @param obj
 */
export function ObjToUrlData(obj: any): string {
    let param = "";
    if (!obj) return param;
    let i = true;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (i) {
                i = false;
            } else {
                param += "&";
            }
            param += `${key}=${encodeURIComponent(obj[key])}`;
        }
    }
    return param;
}

export function TranslateMoneyTypeName(moneyType: QL_Common.CurrencyType): string {
    switch (moneyType) {
        case QL_Common.CurrencyType.Gold: return "金币";
        case QL_Common.CurrencyType.MatchScore: return "记分";
        case QL_Common.CurrencyType.Diamond: return "钻石";
        // case QL_Common.CurrencyType.RMB: return "元";
        // case QL_Common.CurrencyType.VIP1: return "VIP";
        // case QL_Common.CurrencyType.VIPExperienceCard: return "VIP体验";
    }
    return "未知币种";
}

export function addZero(num: number, length: number, insert: string = "0"): string {
    const str = num.toString();
    if (str.length >= length) return str;
    return new Array(length - str.length + 1).join(insert) + str;
}


export function InitKeyListener() {


    //ipad和iphone没有返回键，不添加监听
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) {
        return;
    }
    const _cb = cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function (keyCode, event) {
            Global.Instance.EventManager.PostMessageOneHandle(EventCode.onKeyPressed, keyCode);
        }

    });

    cc.eventManager.addListener(_cb, 1);
}


export function ReportError(message: string) {
    if (Debug()) {
        return;
    }
    if (EndWiths(message, "js_cocos2dx_JSObjCBridge : call result code: -4")) {
        return;
    }
    var type = "iOS_" + ConfigData.RegionName;
    if (cc.sys.platform === cc.sys.ANDROID) {
        type = "android_" + ConfigData.RegionName;
    }
    message = `id:${Global.Instance.DataCache.UserInfo.userData.UserID} jsversion:${cc["jsversion"]} appversion:${cc["LocalVersion"]} ${message}`
    // var data = 'type=' + encodeURIComponent(type) + '&message=' + encodeURIComponent(message);
    // var xhr = cc.loader.getXMLHttpRequest();
    // xhr.open('POST', 'http://api.friendgame.8hb.cc/open/do/api.system.addclientlog', true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhr.send(data);

    // NativeCtrl.

}

export function StartWiths(str: string, start: string) {
    if (!str || str.length === 0) return false;
    if (!start || start.length === 0) return true;
    if (str.length < start.length) return false;
    const idx = str.indexOf(start);
    return idx === 0;
}


export function EndWiths(str: string, end: string) {
    if (!str || str.length === 0) return false;
    if (!end || end.length === 0) return true;
    if (str.length < end.length) return false;
    const idx = str.lastIndexOf(end);

    if (idx < 0) return false;
    if (idx + end.length === str.length) return true;
    return false;
}


export function ParseInviteUri(e: string): ShareParamExpands {
    const param = new ShareParamExpands();
    if (e == null || !e || e.length === 0) return param;
    const q = e.split("?")[1];
    if (!q || q.length === 0) return param;
    const kv = q.split("&");
    for (let i = 0; i < kv.length; i++) {
        const d = kv[i];
        const s = d.split("=");
        if (s.length != 2) continue;
        param[s[0]] = s[1];
    }
    return param;
}

/**
 * 解析分享拉起app回调参数类型(JSON)
 */
export function ParseInviteJson(e: string): ShareParamExpands {
    if (!e) {
        return;
    }

    const param = new ShareParamExpands();
    let json = JSON.parse(e);
    param.tableid = json['roomId'];
    return param;
}

function getRad(d) {
    return d * Math.PI / 180.0;
}
export function SizeLength(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0;    //单位M
    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}
export function TryJSONParse(json: string) {
    try {
        return JSON.parse(json);
    }
    catch (e) {
        return {};
    }
}

/**
 * 将Object 转换成"key:value|key:value"格式的字符串
 */
export function ObjectToString(obj: any): string {
    let str = "";
    let len = Object.keys(obj).length;
    if (!obj || 0 == Object.keys(obj).length) {
        cc.info("error: objectToString param is error");
        return str;
    }

    let idx = 0;
    let value = null;
    for (let key in obj) {
        value = obj[key];
        // 判断是否是数组
        let arr = "";
        if ("object" == typeof (value) && "number" == typeof (value.length)) {
            for (let idx = 0; idx < value.length; idx++) {
                arr += value[idx];

                if (idx < value.length - 1) {
                    arr += "&";
                }
            }

            str += key + ":" + arr;
        } else {
            str += key + ":" + obj[key];
        }

        if (idx < len - 1) {
            str += "|";
        }

        idx++;
    }

    return str;
}

/**
 * 将"key:value|key:value"格式的字符串转换成 Object
 */
export function StrToObject(str: string): any {
    if (!str || "" === str) {
        cc.info("error strToObject param is error");
        return null;
    }

    let obj = {};

    // 正则匹配格式

    let keys = str.split("|");

    for (let idx = 0; idx < keys.length; ++idx) {
        let str = keys[idx];
        let array = str.split(":");
        obj[array[0]] = array[1];
    }

    return obj;
}

/**
 * 将时间戳转换成日期格式字符串 (单位： 毫秒)
 */
export function MillisSecondToDate(millis: number): string {
    let str = '';
    if (millis && millis <= 0) {
        return;
    }

    let date = new Date(millis);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let h = date.getHours().toString();
    let min = date.getMinutes().toString();
    let s = date.getSeconds().toString();

    if (parseInt(month) < 10) {
        month = '0' + month;
    }

    if (parseInt(day) < 10) {
        day = '0' + day;
    }

    if (parseInt(h) < 10) {
        h = '0' + h;
    }

    if (parseInt(min) < 10) {
        min = '0' + min;
    }

    if (parseInt(s) < 10) {
        s = '0' + s;
    }

    str = year + "-" + month + "-" + day + " " + h + ":" + min + ":" + s;
    return str;
}

/**
 * 播放背景音乐
 */
export function PlayBgMusic(path: string) {
    if (!path || path.length <= 0) {
        cc.log("找不到此背景音乐文件" + path);
        return;
    }

    Global.Instance.AudioManager.Play(path, AudioType.Music, true);
}

/**
 * 播放音效
 */
export function PlayEffect(path: string) {
    if (!path || path.length <= 0) {
        cc.log("找不到此音效文件" + path);
        return;
    }

    Global.Instance.AudioManager.Play(path, AudioType.Effect, false);
}

export function JsonFormat(json) {
    if (!json) {
        return json;
    }

    if (json.status != "success") {
        return json;
    }

    if (!json.column || !json.data) {
        return json;
    }


    // let data = new Array<any>()

    // for (let index = 0; index < json.column.length; index++) {
    //     let c = [];
    //     c.push(json.column[index]);
    //     for (let i = 0; i < json.data.length; index++) {
    //         const element = array[index];

    //     }
    // }

    // return {

    // }
}

// function loadNative (url:string, callback:Function){
//     var dirpath =  jsb.fileUtils.getWritablePath() + 'img/';
//     var filepath = dirpath + MD5(url) + '.png';

//     function loadEnd(){
//         cc.loader.load(filepath, function(err, tex){
//             if( err ){
//                 cc.error(err);
//             }else{
//                 var spriteFrame = new cc.SpriteFrame(tex);
//                 if( spriteFrame ){
//                     spriteFrame.retain();
//                     callback(spriteFrame);
//                 }
//             }
//         });

//     }

//     if( jsb.fileUtils.isFileExist(filepath) ){
//         cc.log('Remote is find' + filepath);
//         loadEnd();
//         return;
//     }

//     var saveFile = function(data){
//         if( typeof data !== 'undefined' ){
//             if( !jsb.fileUtils.isDirectoryExist(dirpath) ){
//                 jsb.fileUtils.createDirectory(dirpath);
//             }

//             if( jsb.fileUtils.writeDataToFile(new Uint8Array(data) , filepath) ){
//                 cc.log('Remote write file succeed.');
//                 loadEnd();
//             }else{
//                 cc.log('Remote write file failed.');
//             }
//         }else{
//             cc.log('Remote download file failed.');
//         }
//     };

//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'arraybuffer';
//     xhr.onreadystatechange = function () {
//         cc.log("xhr.readyState  " +xhr.readyState);
//         cc.log("xhr.status  " +xhr.status);
//         if (xhr.readyState === 4 ) {
//             if(xhr.status === 200){                
//                 saveFile(xhr.response);
//             }else{
//                 saveFile(null);
//             }
//         }
//     }.bind(this);
//     xhr.open("GET", url, true);
//     xhr.send();
// }
// 
export function checkNumber(str) {
    var reg = /^[0-9]+?$/;
    if (reg.test(str)) {
        return true;
    }
    return false;
}