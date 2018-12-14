import { IUiManager } from "../Interface/IUiManager";
import { Action } from "../CustomType/Action";
import UIBase from "../Form/Base/UIBase";
import Dictionary from "../CustomType/Dictionary";
import { Tips } from "../Form/General/Tips";
import { MessageBox } from "../Form/General/MessageBox";
import { UIName } from "../Global/UIName";
import { LoadingForm } from "../Form/Loading/LoadingForm";
import { GameCachePool } from "../Global/GameCachePool";
import { UrlMsgBox } from "../Form/General/UrlMsgBox";
import { TimerForm } from "../Form/General/TimerForm";
import { QL_Common } from "../CommonSrc/QL_Common";
import { PlayEffect } from "../Tools/Function";
import { InputFormViewParam } from "../Form/Daili/InputFormView";
import HornPanel from "../Form/Horn/HornPanel";
import HornGamePanel from "../Form/Horn/HornGamePanel";
import { UIOperationInfo } from "../CustomType/UIOperationInfo";
import { ThrowErrorHelper } from "../Global/ThrowErrorHelper";




export default class UiManager implements IUiManager {

    private _uiList: Dictionary<string, UIBase<any>>;
    private _tipsList: Array<Tips>;
    private _msgBoxList: Array<MessageBox>;
    private _onlyOneInstance: any = {};
    private _uiOpQueue: Array<UIOperationInfo> = new Array<UIOperationInfo>()

    private _loading: LoadingForm;
    public constructor() {
        this._uiList = new Dictionary<string, UIBase<any>>();
        this._tipsList = new Array();
        this._msgBoxList = new Array();
        // this._noticeList = new Array();
    }

    private _loadingInfo: string;
    private _loadingShow: boolean;

    ShowLoading(str?: string) {
        this._loadingInfo = str;
        this._loadingShow = true;
        if (cc.isValid(this._loading)) {
            cc.log("已存在loading,直接再次显示");
            this._loading.Show(null);
            this.LoadingInfo(str);
            return;
        }
        cc.log("开始加载" + UIName.Loading);
        cc.loader.loadRes(UIName.Loading, this.onLoadingLoaded.bind(this));
    }

    CloseLoading() {
        this._loadingShow = false;
        if (cc.isValid(this._loading)) {
            this._loading.Close();
        }
    }


    LoadingInfo(str: string) {
        if (cc.isValid(this._loading)) {
            this._loading.OnLoadInfo(str);

        }
    }
    public GetUINode(UIName: string): cc.Node {
        let ui = this._uiList.GetValue(UIName);
        if (ui) {
            return ui.node;
        }
    }





    ShowUi(uiname: string): void;
    ShowUi(uiname: string, param: any): void;
    ShowUi(uiname: string, param: any, action: Action): void;
    ShowUi(uiname: any, param?: any, action?: any) {
        let up = new UIOperationInfo();
        up.name = uiname;
        up.opType = "show";
        up.param = param;
        up.scene = "Hall";
        up.action = action;
        this._uiOpQueue.push(up);
        this.TryProcessUIOperationHandle();
    }
    CloseUi(uiname: string): void {
        let up = new UIOperationInfo();
        up.name = uiname;
        up.opType = "close";
        up.scene = "Hall";
        this._uiOpQueue.push(up);
        this.TryProcessUIOperationHandle();
    }
    DestroyUi(uiname: string): void {
        let up = new UIOperationInfo();
        up.name = uiname;
        up.opType = "destroy";
        up.scene = "Hall";
        this._uiOpQueue.push(up);
        this.TryProcessUIOperationHandle();

    }

    ShowTip(msg: string, time: number = 2) {
        let tip: Tips;
        for (let i = 0; i < this._tipsList.length; i++) {
            if (this._tipsList[i].IsFree) {
                tip = this._tipsList[i];
                break;
            }
        }

        if (cc.isValid(tip)) {
            tip.Go(msg, time);
            return;
        }
        const t = this;
        cc.loader.loadRes("Prefabs/General/Tips", function (err, prefab: cc.Prefab) {
            if (err) {
                ThrowErrorHelper.error(err.message || err);
                return;
            }
            const newNode = cc.instantiate(prefab);
            var tp = newNode.getComponent<Tips>(Tips);
            t._tipsList.push(tp);
            tp.Go(msg, time);
        });
    }

    ShowMsgBox(msg: string, thisobj?: any, okAction?: Function, cancleAction?: Function, closeAction?: Function, okArgs?: any, cancleArgs?: any, closeArgs?: any, align: cc.Label.HorizontalAlign = cc.Label.HorizontalAlign.CENTER): void {
        let box: MessageBox;
        for (let i = 0; i < this._msgBoxList.length; i++) {
            if (this._msgBoxList[i].IsFree) {
                box = this._msgBoxList[i];
                break;
            }
        }

        if (cc.isValid(box)) {
            box.Go(msg, thisobj, okAction, cancleAction, closeAction, okArgs, cancleArgs, closeArgs);
            box.text.horizontalAlign = align;
            return;
        }
        const t = this;
        cc.loader.loadRes(UIName.MessageBox, function (err, prefab: cc.Prefab) {
            if (err) {
                ThrowErrorHelper.error(err.message || err);
                return;
            }
            const newNode = cc.instantiate(prefab);
            var box = newNode.getComponent<MessageBox>(MessageBox);
            t._msgBoxList.push(box);

            box._uiName = UIName.MessageBox;
            box.Go(msg, thisobj, okAction, cancleAction, closeAction, okArgs, cancleArgs, closeArgs);
            box.text.horizontalAlign = align;
        });
    }

    ShowInputBox(param: InputFormViewParam) {
        this.ShowUi('Prefabs/Daili/InputFormView', param);
    }

    ShowUrlMsgBox(url: string): void {
        if (!url || url.length < 7) return;
        let node = GameCachePool.UrlMsgBoxPool.get();
        if (cc.isValid(node)) {
            let c = node.getComponent<UrlMsgBox>(UrlMsgBox);
            c.Go(null, url);
            return;
        }
        cc.loader.loadRes("Prefabs/General/UrlMsgBox", cc.Prefab, (err, prefab: cc.Prefab) => {
            if (err) {
                ThrowErrorHelper.error(err);
                return;
            }
            node = cc.instantiate(prefab);
            let c = node.getComponent<UrlMsgBox>(UrlMsgBox);
            c.Go(null, url);
        });
    }

    /**
     * 播放跑马灯
     * @param HornEntity 数据实体
     * @param pos_x 游戏才会调用此参数(有默认值) 跑马灯 x 坐标
     * @param pos_y 游戏才会调用此参数(有默认值) 跑马灯 y 坐标
     */
    ShowHorn(HornEntity: QL_Common.SystemHornEntity, pos_x: number, pos_y: number) {
        if (HornEntity == null) {
            return;
        }

        let systemHornType = QL_Common.SystemHornType; //跑马灯类型

        /**
         * 用于判断跑马灯类型
         */
        switch (HornEntity.HornType) {
            case systemHornType.Unkonown:
                cc.log("跑马灯类型未定义. 请联系技术部沈瑞.")
                break;
            case systemHornType.System:
                break;
            case systemHornType.Server:
                break;
            case systemHornType.Game: //游戏跑马灯
                if (HornGamePanel.HornGameIsPlay == true) {
                    HornGamePanel.HornGameList[HornGamePanel.HornGameList.length] = HornEntity;
                    cc.log("当前有跑马灯正在播报");
                    return;
                }

                if (pos_x == null) {
                    pos_x = 0;
                }

                if (pos_y == null) {
                    pos_y = 240;
                }

                HornGamePanel.HornGameList[HornGamePanel.HornGameList.length] = HornEntity;

                this.ShowUi(UIName.HornGamePanel, [HornEntity.LoopCount, pos_x, pos_y]);
                break;
            case systemHornType.Hall: //大厅跑马灯
                cc.log("进来了. 大厅跑马灯");
                if (HornPanel.HornHallIsPlay == true) {
                    return;
                }

                this.ShowUi(UIName.HornPanel, HornEntity.LoopCount);
                break;
            case systemHornType.All:
                break;
            default:
                break;
        }
    }

    private onLoadingLoaded(err, prefab: cc.Prefab) {
        if (err) {
            ThrowErrorHelper.error(err.message || err);
            return;
        }
        const newNode = cc.instantiate(prefab);
        var u = newNode.getComponent<LoadingForm>(LoadingForm)
        if (!cc.isValid(u)) {
            cc.warn("无效的ui组件")
            return;
        }
        if (this._loadingInfo) {
            this.LoadingInfo(this._loadingInfo);
        }
        this._loading = u;
        if (this._loadingShow) {
            u.Show(null);
        }

    }


    public GetTimerForm(): cc.Node {
        return TimerForm.create();
    }


    PlayHallRoolNotice(notice: any) {
        // if (!notice) return;
        // this._noticeList.push(notice);
        // this.onPlayNotice();
    }


    // private onPlayNotice() {
    //     // //如果正在播放公告，直接返回
    //     // if (this._noticeLock) {
    //     //     return;
    //     // }
    //     // if (!this._noticeList || this._noticeList.length === 0) {

    //     //     if (cc.isValid(this._noticeForm)) {
    //     //         this._noticeForm.Close();
    //     //     }
    //     //     return;
    //     // }
    //     // this._noticeLock = true;
    //     // const notice = this._noticeList.shift();

    //     // if (cc.isValid(this._noticeForm)) {
    //     //     this._noticeForm.Go(notice);
    //     //     return;
    //     // } else {
    //     //     const action = new Action(this, this.onPlayNoticeEnd);
    //     //     cc.loader.loadRes("Prefabs/General/NoticeForm", cc.Prefab, function (err, prefab: cc.Prefab) {
    //     //         if (err) {
    //     //             ThrowErrorHelper.error(err);
    //     //             return;
    //     //         }
    //     //         const node = cc.instantiate(prefab);
    //     //         let c = node.getComponent<NoticeForm>(NoticeForm);
    //     //         c.Action = action;
    //     //         this._noticeForm = c;
    //     //         c.Go(notice);
    //     //     }.bind(this));
    //     // }
    // }

    // private onPlayNoticeEnd() {
    //     this._noticeLock = false;
    //     cc.log("公告播放完成！")
    //     this.onPlayNotice();
    // }



    private _doing = false;
    private TryProcessUIOperationHandle(force: boolean = false) {
        try {

            if (force) {
                this._doing = false;
            }
            if (this._doing) return;
            if (!this._uiOpQueue || this._uiOpQueue.length === 0) return false;
            if (this._doing) return;
            this._doing = true;
            while (this.UIOperationHandle());
            if (!this._uiOpQueue || this._uiOpQueue.length === 0) {
                this.TryProcessUIOperationHandle();
            }
        }
        catch (e) {
            ThrowErrorHelper.error(e);
            this.TryProcessUIOperationHandle(true);
        }
    }
    private UIOperationHandle(): boolean {

        if (!this._uiOpQueue || this._uiOpQueue.length === 0) {
            this._doing = false;
            return false;
        }

        //获取一条暂存的字节流信息
        const op = this._uiOpQueue.shift();
        if (!op) return true;
        cc.log(op);
        
        let uiname = op.name;
        let param = op.param;
        let action = op.action;
        switch (op.opType) {
            case "show": {
                return this.UIOperationHandle_show(uiname, param, action);
            }
            case "close": {
                return this.UIOperationHandle_close(uiname);
            }
            case "destroy": {
                return this.UIOperationHandle_destroy(uiname);
            }
        }

    }
    private UIOperationHandle_destroy(uiname: string): boolean {

        let ui = this._uiList.GetValue(uiname);
        if (cc.isValid(ui)) {
            ui.node.destroy();
            this._uiList.Remove(uiname);
            PlayEffect(cc.url.raw("resources/Sound/close_panel.mp3"));
        } else {
            cc.warn("未找到组件" + uiname);
        }

        return true;
    }
    private UIOperationHandle_close(uiname: string): boolean {
        let ui = this._uiList.GetValue(uiname);
        if (cc.isValid(ui)) {
            if (ui.canReUse) {
                ui.CloseClick();
            } else {
                this.DestroyUi(uiname);
            }
        } else {
            cc.warn("未找到组件" + uiname);
        }
        return true;
    }
    private UIOperationHandle_show(uiname: any, param: any, action?: any): boolean {
        let ui = this._uiList.GetValue(uiname);
        if (cc.isValid(ui)) {
            try {
                cc.info(`已存在${uiname}，直接显示`);
                PlayEffect(cc.url.raw("resources/Sound/open_panel.mp3"));
                ui.Show(null, param, action);
                return true;
            } catch (e) {
                ThrowErrorHelper.error(e);
                ui.node.destroy();
            }
        }
        const t = this;
        cc.log("开始加载" + uiname);
        cc.loader.loadRes(uiname, function (err, prefab: cc.Prefab) {

            let uiBaseInstance: UIBase<any> = null;
            try {
                if (err) {
                    ThrowErrorHelper.error(err.message || err);
                    return;
                }

                const newNode = cc.instantiate(prefab);
                uiBaseInstance = <UIBase<any>>newNode.getComponent(UIBase)
                if (!cc.isValid(uiBaseInstance)) {
                    cc.warn("无效的ui组件")
                    return;
                }

                PlayEffect(cc.url.raw("resources/Sound/open_panel.mp3"));
                //检查是否是单根实例
                if (uiBaseInstance.isOneInstance) {
                    let _oneInstance = t._onlyOneInstance[uiname];
                    if (cc.isValid(_oneInstance)) {
                        return;
                    }
                    t._onlyOneInstance[uiname] = uiBaseInstance;
                }
                //设置ui的名称
                uiBaseInstance._uiName = uiname;
                uiBaseInstance.Show(null, param, action);
                t._uiList.AddOrUpdate(uiname, uiBaseInstance);
            } catch (e) {
                ThrowErrorHelper.error(e);
                if (cc.isValid(uiBaseInstance)) {
                    uiBaseInstance.node.destroy();
                    uiBaseInstance.destroy();
                }
            } finally {
                t.TryProcessUIOperationHandle(true);
            }

        });
        return false;
    }





}