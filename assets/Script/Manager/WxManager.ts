/**
 * 分享相关
 */
import { IWXManager } from "../Interface/IWXManager";
import { ShareParam } from "../CustomType/ShareParam";
import { ObjToUrlData } from "../Tools/Function";
import { NativeCtrl } from "../Native/NativeCtrl";
import Global from "../Global/Global";
import { UIName } from "../Global/UIName";
import { QRCode, QRErrorCorrectLevel } from "../CustomType/QRCode";

export class WxManager implements IWXManager {
    
    /**
     * Hall: 大厅分享(加钻石)
     * Game: 游戏分享(不加钻石)
     * Rank: 排行榜分享(不加钻石)
     */
    public static ShareSceneType : string;

    Login(): void {
        NativeCtrl.WxLogin();
    }

    ShareAndSelectType(param: ShareParam): void {
        // Global.Instance.UiManager.ShowUi(UIName.Share, param);
    }
    /**
     * 文本、链接分享公用
     * @param param 
     */
    Share(param: ShareParam): void {
        cc.info('--- share param ', param);
        
        if (param.link_param) {
            let data = ObjToUrlData(param.link_param);
            if (data.length > 0) {
                if (param.link.indexOf("?") >= 0) {
                    param.link += "&" + data;
                } else {
                    param.link += "?" + data;
                }
            }
        }
        const result = NativeCtrl.WxShare(JSON.stringify(param));
        if (result && result !== "success") {
            Global.Instance.UiManager.ShowTip(result);
        }
    }

    ShareInviteImg(param: ShareParam): void {
        // if (cc.sys.isBrowser) {
        //     return;
        // }
        // if (param.link_param) {
        //     let data = ObjToUrlData(param.link_param);
        //     if (data.length > 0) {
        //         if (param.link.indexOf("?") >= 0) {
        //             param.link += "&" + data;
        //         } else {
        //             param.link += "?" + data;
        //         }
        //     }
        // }

        // cc.loader.loadRes("Prefabs/Share/inviteImg", cc.Prefab, (err, prefab: cc.Prefab) => {
        //     if (err) {
        //         return;
        //     }

        //     const root = cc.instantiate(prefab);
        //     const title = root.getChildByName("title");
        //     const desc = root.getChildByName("desc");
        //     title.getComponent(cc.Label).string = param.title;
        //     desc.getComponent(cc.Label).string = param.text;


        //     const node = new cc.Node("qrcode");
        //     node.scaleY = -1
        //     node.width = 401;
        //     node.height = 401;
        //     node.setPosition(375, -128);
        //     node.parent = root;
        //     var ctx = node.addComponent(cc.Graphics);
        //     ctx.fillColor = cc.Color.BLACK;

        //     var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        //     qrcode.addData(param.link);
        //     qrcode.make();
        //     var tileW = node.width / qrcode.getModuleCount();
        //     var tileH = node.height / qrcode.getModuleCount();
        //     for (var row = 0; row < qrcode.getModuleCount(); row++) {
        //         for (var col = 0; col < qrcode.getModuleCount(); col++) {
        //             if (qrcode.isDark(row, col)) {
        //                 var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
        //                 var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
        //                 ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        //                 ctx.fill();
        //             }
        //         }
        //     }

        //     cc.director.getScene().addChild(root);

        //     var filename: string = "Screenshot.jpg"
        //     this.CaptureScreenshotMethod(function () {
        //         root.destroy();
        //         setTimeout(function () {
        //             const obj = {};
        //             obj["path"] = jsb.fileUtils.getWritablePath() + filename;
        //             obj["scene"] = param.WXScene;
        //             const result = NativeCtrl.Screenshot(JSON.stringify(obj));
        //             if (result && result !== "success") {
        //                 Global.Instance.UiManager.ShowTip(result);
        //             }
        //         }, 100);
        //     }, true, root, filename)

        // });

    }

    ShareLinkImg(param: ShareParam): void {
        // if (cc.sys.isBrowser) {
        //     return;
        // }
        // if (param.link_param) {
        //     delete param.link_param.tableid;
        //     delete param.link_param.chairid;
        //     let data = ObjToUrlData(param.link_param);
        //     if (data.length > 0) {
        //         if (param.link.indexOf("?") >= 0) {
        //             param.link += "&" + data;
        //         } else {
        //             param.link += "?" + data;
        //         }
        //     }
        // }
        // const result = NativeCtrl.WxShare(JSON.stringify(param));
        // if (result && result !== "success") {
        //     Global.Instance.UiManager.ShowTip(result);
        // }

        const width = 1080;
        const height = 1920;


        const root = new cc.Node();
        root.width = width;
        root.height = height;
        let size = root.getContentSize();
        root.x = size.width / 2;
        root.y = size.height / 2;
        // const bg = root.addComponent(cc.Sprite);
        // bg.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/Texture/SiteVirtualDir/shareBg.jpg"));
        root.parent = cc.director.getScene();



        // const node = new cc.Node("qrcode");
        // node.scaleY = -1
        // node.width = 604;
        // node.height = 604;

        // node.setPositionY(-526);
        // node.parent = root;
        // var ctx = node.addComponent(cc.Graphics);
        // ctx.fillColor = cc.Color.BLACK;

        // var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        // qrcode.addData(param.link);
        // qrcode.make();
        // var tileW = node.width / qrcode.getModuleCount();
        // var tileH = node.height / qrcode.getModuleCount();
        // for (var row = 0; row < qrcode.getModuleCount(); row++) {
        //     for (var col = 0; col < qrcode.getModuleCount(); col++) {
        //         if (qrcode.isDark(row, col)) {
        //             var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
        //             var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
        //             ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        //             ctx.fill();
        //         }
        //     }
        // }
        var filename: string = "Screenshot.jpg"
        this.CaptureScreenshotMethod(function () {
            root.destroy();
            setTimeout(function () {
                const obj = {};
                obj["path"] = jsb.fileUtils.getWritablePath() + filename;
                obj["scene"] = param.WXScene;
                const result = NativeCtrl.Screenshot(JSON.stringify(obj));
                if (result && result !== "success") {
                    Global.Instance.UiManager.ShowTip(result);
                }
            }, 100);
        }, false, root, filename)
    }

    /**
     * 捕捉屏幕作为一个PNG文件保存在路径filename
     */
    CaptureScreenshot(node: cc.Node = null,wXScene:number = 0,haveMask: boolean = false,filename: string = "Screenshot.jpg"): void {
        if (cc.sys.isBrowser) {
            return;
        }

        this.CaptureScreenshotMethod(function () {

            cc.log(`截屏保存路径：${jsb.fileUtils.getWritablePath() + filename}`);
            setTimeout(function () {

                //截图分享操作
                const share = new ShareParam();
                share.shareType = "img";
                share.shareImg = jsb.fileUtils.getWritablePath() + filename;
                share.thumb_size = 200;
                share.WXScene = wXScene;
                Global.Instance.WxManager.Share(share);

                // const obj = {};
                // obj["path"] = jsb.fileUtils.getWritablePath() + filename;
                // obj["scene"] = 0;
                // const result = NativeCtrl.Screenshot(JSON.stringify(obj));
                // if (result && result !== "success") {
                //     Global.Instance.UiManager.ShowTip(result);
                // }
            }, 100);
        }, haveMask, node, filename);
    }


    private CaptureScreenshotMethod(callback: Function, haveMask: boolean = false, root: cc.Node = null, filename: string = "Screenshot.jpg") {


        //  //注意，EditBox，VideoPlayer，Webview 等控件无法截图

        //  if(CC_JSB) {
        //     //如果待截图的场景中含有 mask，请开启下面注释的语句
        //     // var renderTexture = cc.RenderTexture.create(1280,640, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        //     var renderTexture = cc.RenderTexture.create(1280,640);

        //     //把 renderTexture 添加到场景中去，否则截屏的时候，场景中的元素会移动
        //     this.richText.node.parent._sgNode.addChild(renderTexture);
        //     //把 renderTexture 设置为不可见，可以避免截图成功后，移除 renderTexture 造成的闪烁
        //     renderTexture.setVisible(false);

        //     //实际截屏的代码
        //     renderTexture.begin();
        //     //this.richText.node 是我们要截图的节点，如果要截整个屏幕，可以把 this.richText 换成 Canvas 切点即可
        //     this.richText.node._sgNode.visit();
        //     renderTexture.end();
        //     renderTexture.saveToFile("demo.png",cc.ImageFormat.PNG, true, function () {
        //         //把 renderTexture 从场景中移除
        //         renderTexture.removeFromParent();
        //         cc.log("capture screen successfully!");
        //     });
        //     //打印截图路径
        //     cc.log(jsb.fileUtils.getWritablePath());
        // }


        if (cc.sys.isBrowser) {
            Global.Instance.UiManager.ShowTip("截图分享功能请在手机中使用");
            return;
        }

        if (CC_JSB) {

            let size: cc.Size;
            let panel;
            let p: cc.Vec2;
            if (!cc.isValid(root)) {
                panel = cc.director.getScene()._sgNode;
                size = cc.view.getVisibleSize();
            } else {
                panel = root._sgNode;
                //先备份原始位置
                p = root.getPosition();
                size = root.getContentSize();
                root.x = size.width / 2;
                root.y = size.height / 2;
            }

            if (haveMask) {
                var texture = cc.RenderTexture.create(size.width, size.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
            } else {
                var texture = new cc.RenderTexture(size.width, size.height, cc.ImageFormat.JPG);
            }

            texture.begin();
            panel.visit();
            texture.end();
            texture.saveToFile(filename, cc.ImageFormat.JPG, false, () => {
                cc.log("capture screen successfully!");
                if (p && cc.isValid(root)) {
                    root.setPosition(p);
                }
                callback();
            });

        }


    }
}