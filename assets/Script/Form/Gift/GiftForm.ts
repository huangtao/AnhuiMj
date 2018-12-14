import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { QL_Common } from "../../CommonSrc/QL_Common";
import Global from "../../Global/Global";
import { ActionNet } from "../../CustomType/Action";
import { WebRequest } from "../../Net/Open8hb";
import GiftInfo from "./GiftInfo";
import GiftItem from "./GiftItem";
import { EventCode } from "../../Global/EventCode";
import { PlayEffect } from "../../Tools/Function";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GiftForm extends UIBase<any> {
    public IsEventHandler: boolean=true;
    public IsKeyHandler: boolean=true;
    public get isPlayPopAction(): boolean { return false; }
    
    /**
     * 左边类目菜单根节点
     */
    @property(cc.Node)
    CategoryContent : cc.Node = null;

    /**
     * 右边内容菜单根节点
     */
    @property(cc.Node)
    ItemContent : cc.Node = null;

    /**
     * 右边兑换项预制体
     */
    @property(cc.Prefab)
    GiftItemPanel : cc.Prefab = null;

    /**
     * 七豆数量显示
     */
    @property(cc.Label)
    LabQiDou : cc.Label = null;

    /**
     * 右侧列表
     */
    @property(cc.ScrollView)
    RightList : cc.ScrollView = null;

    /**
     * 记录本地缓存表
     */
    private dataList = new Array<any>();

    InitShow() {
        this.ClickMenuType(null, 1); //默认点击第一个类目
    }

    /**
     * 初始化操作
     */
    private Init(type:number){
        if(!type){
            return;
        }

        let qidou = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.QiDou);
        if(qidou){
            this.LabQiDou.string = qidou.toString(); //七豆数量显示
        }else{
            this.LabQiDou.string = "0";
        }

        if(!this.dataList[type]){
            this.UiManager.ShowLoading("正在获取兑换商品数据");
            const data = WebRequest.DefaultData();
            const action = new ActionNet(this, this.success, this.error);
            data.Add("giftType", type);
            data.Add("api_version", 1);
            WebRequest.gift.giftList(action, data);
        }else{
            this.initDataList(type, null);
        }
    }

    /**
     * 获取数据成功
     */
    private success(obj){
        this.UiManager.CloseLoading();
        this.UiManager.ShowLoading("正在加载兑换商品数据");
        if(!obj){
            this.UiManager.CloseLoading();
            this.UiManager.ShowTip("初始化信息异常");
            cc.log("获取接口参数失败");
            return;
        }

        let data = obj.data;
        let type = data[1][2];

        this.initDataList(type, data);
    }

    /**
     * 获取数据失败
     */
    private error(){
        this.UiManager.CloseLoading();
        this.UiManager.ShowTip("获取兑换商品信息失败, 请确认网络连接是否正常");
        cc.log("接口调取失败!");
    }

    /**
     * 当玩家点击菜单时
     * @param e 
     * @param type 玩家点击的类目类型
     */
    private ClickMenuType(e, type){
        this.ToggleEffect(type);
    }

    /**
     * 实现 toggle 切换效果
     */
    private ToggleEffect(type){
        if(!type){
            return;
        }

        let parent : cc.Node = null; //类目根节点
        let child : cc.Node = null; //被点击后的节点

        /**
         * 实现切换效果
         */
        let nodelist = this.CategoryContent.children
        for (let index = 0; index < nodelist.length; index++) {
            parent = nodelist[index];
            if(parent){
                child = parent.getChildByName("giftKindItem_on");
                if(child){
                    if(parent.name == type){ 
                        if(!child.active){
                            child.active = true;
                        }else{
                            return;
                        }
                    }else{
                        if(child.active){
                            child.active = false;
                        }
                    }
                }else{
                    cc.log("没有找到点击图片节点");
                    this.UiManager.ShowTip("点击时出现未知错误. 请检查网络");
                    return;
                }
            }else{
                cc.log("类目根节点查询失败");
                this.UiManager.ShowTip("点击时出现未知错误. 请检查网络");
                return;
            }
        }

        PlayEffect(cc.url.raw("resources/Sound/open_panel.mp3"));
        this.ItemContent.removeAllChildren();
        this.RightList.scrollToLeft(0.1);
        this.Init(type);
    }

    /**
     * 初始化数据
     */
    private initDataList(type, t_data){
        if(t_data){
            this.dataList[type] = t_data;
        }

        let dataList = this.dataList[type];
        if(!dataList){
            this.UiManager.ShowTip("初始化信息异常");
            this.UiManager.CloseLoading();
            return;
        }

        let info : GiftInfo = null;
        let data = null;

        let GiftInfoArray = new Array<GiftInfo>()

        /**
         * 动态赋值
         */
        for (var i = 0; i < dataList.length; i++) {
            info = new GiftInfo;
            data = dataList[i];

            if(info && data){
                info.giftId = data[0];
                info.giftName = data[1];
                info.gifttype = data[2];
                info.giftpic = data[3];
                info.qidou = data[4];
                info.introduces = data[5];
                GiftInfoArray.push(info);
            }else{
                this.UiManager.CloseLoading();
                this.UiManager.ShowTip("初始化信息异常");
                cc.log("实例化产品信息出现异常或没有取到每一项数据");
                return;
            }
        }

        this.InitGiftItemPanel(GiftInfoArray); //初始化兑换项
    }

    /**
     * 生成每个兑换项
     */
    private InitGiftItemPanel(data){
        if(!data){
            this.UiManager.CloseLoading();
            return;
        }

        for (let index = 0; index < data.length; index++) {
            let gift_item = cc.instantiate(this.GiftItemPanel);
            if(cc.isValid(gift_item)){
                let giftItem:GiftItem = gift_item.getComponent("GiftItem");
                if(giftItem){
                    giftItem.InitData(data[index]);
                    this.ItemContent.addChild(gift_item);
                }
            }
        }
        
        this.UiManager.CloseLoading();
    }

    /**
    * 兑换记录
    */
    private recordClick(){
        this.UiManager.ShowUi(UIName.GiftExchangeRecord);
    }

    /**
     * 刷新余额
     * @param eventCode 
     * @param value 
     */
    OnEventComeIn(eventCode: number, value: any): boolean {
        switch (eventCode) {
            case EventCode.LatestBalance:
                this.LabQiDou.string = Global.Instance.DataCache.UserProp.GetValue(QL_Common.CurrencyType.QiDou).toString(); //七豆数量显示
                return true;
        }
        // return this.OnUiEventComeIn(eventCode,value);
        return super.OnEventComeIn(eventCode, value);
    }

    CloseClick(){
        super.CloseClick();
        this.RightList.scrollToLeft(0.1);
        // this.ItemContent.x = this.local_pos;
    }
}
