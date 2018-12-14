
import { PrefabPath } from "./BJ_GameHelp";

export function SetTextureRes(url: string, img: cc.Sprite) {
    //cc.loader.loadRes(url, cc.SpriteFrame, aaa.bind(this))
    cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
            cc.error(err);
            return;
        }
        if (!cc.isValid(img)) {
            cc.log("加载资源对象不存在");
            return;
        }
        img.spriteFrame = spriteFrame;
    });
}
export function SetFontRes(url: string, label: cc.Label) {
    cc.loader.loadRes(url, cc.TTFFont, function (err, spriteFrame) {
        if (err) {
            cc.error(err);
            return;
        }
        if (!cc.isValid(label)) {
            cc.log("加载资源对象不存在");
            return;
        }
        label.font = spriteFrame;
    });
}
export function SetNodeChildrenOrder(node: cc.Node) {
    for (var i = 0; i < node.childrenCount; i++) {
        node.children[i].zIndex = i;
    }
}
/**
 * 显示节点视图
 */
export function ShowNodeView(className: string, obj: any, fun1: (value) => void, fun2: () => void = null) {
    if (obj == null) {
        cc.loader.loadRes(PrefabPath + className, function (err, prefab) {
            if (err) {
                cc.error(err);
                return;
            }
            if (obj == null) {
                fun1(prefab);
                fun2();
            }
        }.bind(this));
    }
    else {
        fun2();
    }
}
