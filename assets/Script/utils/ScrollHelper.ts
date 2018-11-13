/*
 * @Author: HuangLang 
 * @Date: 2018-07-13 15:17:37  
 * @Description :无限循环列表
 * @Last Modified by: HuangLang
 * @Last Modified time: 2018-07-17 14:41:19
 */
/**
 * 滑动方向枚举
 */
import { Action } from "../CustomType/Action";
import ScrollHelperItem from "./ScrollHelperItem";

export enum ScrollDirEnum {
    Vertical,
    Horizon
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollHelper extends cc.Component {
       //赋值用的obj
    @property(cc.Prefab)
    item: cc.Prefab = null;
    @property(cc.ScrollView)
    Scroll: cc.ScrollView = null;
    //显示用的content
    @property(cc.Node)
    content: cc.Node = null;
    //附加mask组件的对象
    @property(cc.Node)
    maskNode: cc.Node = null;
    //方向，0是垂直方向，1是水平方向
    @property({type:cc.Integer,tooltip: "0是垂直方向，1是水平方向"})
    verticalDirection: Number = 0;

    /**
     *  需求需要的数量
     */
    @property(Number)
    num: number = 6;

    /**
     * 实际生成item数量
     */
    @property({type:cc.Integer,tooltip: "实际生成item数量"})
    itemNum: number = 5;


    @property({type:cc.Integer,tooltip: "item之间的间距"})
    distance: number = 100;

    @property({type:cc.Integer,tooltip: "需求要求的高度/宽度"})
    needSize: number = 0;

    @property({type:cc.Integer,tooltip: "显示范围高度"})
    visibleHeight: number = 0;
    
    @property({type:cc.Integer,tooltip: "物品高度"})
    itemsHeight: Number = 0;

    /**
     * 实际运行时生成的数量
     */
    private _itemNum: number = 5;

     /**
     * 显示的数据
     */
    private _showData: any

    /**
     * 上一个选中项
     */
    private _preSelectItem: ScrollHelperItem = null;

    /**
     * 默认选中=项索引
     */
    private _defaultSelectedIdx: number = 0;

    // 列表点击事件回调
    private _action: Action = null;

    public set clickAction(act: Action){
        this._action = act;
    }

    public get ShowData(){ return this._showData; }
    public set ShowData(data: any){ this._showData = data; }

    //滑动的方向
    public scrollDir: ScrollDirEnum = ScrollDirEnum.Vertical;
    
    public get ScrollDir() { return this.scrollDir; }
    public set ScrollDir(val) { this.scrollDir = val; }

    public get Num() { return this.num; }
    public set Num(val) {
        if (val < this.ItemNum) {
            this._itemNum = val;
        }else{
            this._itemNum = this.ItemNum;
        }

        this.num = val; 
     }

    public get ItemNum() { return this.itemNum; }
    public set ItemNum(val) { 
            this._itemNum = val;
            this.itemNum = val;
         }

    public OnScrollFun = null;//滑动回调

    //可见范围
    private minY: number = 0;
    private maxY: number = 0;

    //可以显示的范围，可见范围 超过 可以显示的范围，就刷新列表（把缓存的item放到下面或上面）
    private minVisibleY: number = 0;
    private maxVisibleY: number = 0;
    public initX = this.distance / 2;
    public initY = -this.distance / 2;

    //初始化可见的item
    private itemsList = new Array();

    /**
     * 是否触发滚动到顶部或底部事件
     */
    private _isTriggerTopOrBottomEvent: boolean = true;
    /**
     * 滚动到顶部或底部事件回调
     */
    private _scrollTopOrBottomEvent: Function = null;

    start() {
        this.scrollDir = this.verticalDirection as ScrollDirEnum;
        this.Init(this._itemNum);
    }

    Init(num: number) {
        if (!this._showData || 0 == this._showData.length) {
            return;
        }
        
        if (0 == this.Scroll.scrollEvents.length) {
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "ScrollHelper";
            eventHandler.handler = "OnScroll";
            this.Scroll.scrollEvents.push(eventHandler);
        }

        
        this._isTriggerTopOrBottomEvent = true;
        this.needSize = this.num * this.distance;

        if (this.scrollDir == ScrollDirEnum.Horizon) {
            this.initX = this.distance / 2;
            this.initY = 0;
            this.content.setContentSize(new cc.Size(this.needSize, this.content.getContentSize().height));

        } else {
            this.initX = 0;
            this.initY = -this.distance / 2;
            this.content.setContentSize(new cc.Size(this.content.getContentSize().width, this.needSize));
        }
        this.visibleHeight = this.maskNode.getContentSize().height;

        if (0 == this.itemsList.length) {
            this.InitObjs();
        }

        cc.info("--show num", this.Num);
        cc.info("--realItem num", this._itemNum);
    }

    InitObjs() {
        let curX = 0;
        let curY = 0;
        for (let i = 0; i < this._itemNum; i++) {
            let obj = cc.instantiate(this.item);
            let component = obj.getComponent(obj.name);
            if (cc.isValid(component)) {
                component.clickAction = this._action;
                component.scroll = this;
            }
            
            obj.parent = this.content;
            obj.active = true;

            if (this.scrollDir == ScrollDirEnum.Horizon) {
                curX = this.initX + this.distance * i;
                // console.error("curX:" + curX);
            }
            else {
                curY = this.initY - this.distance * i;
                // console.error("curY:" + curY);
            }

            obj.setPositionX(curX);
            obj.setPositionY(curY);
            this.onRefresh(obj, i, i);
            this.itemsList.push(obj);
        }
    }

    //计算边界，超过边界则刷新列表
    //offest是左上角原点滑动的偏移量
    private countBorder(offest) {
        let height = this.visibleHeight;//可见高度
        this.minY = offest;//获得相对于左上角原点的最小y值
        this.maxY = offest + height;//获得相对于左上角原点的最大y值
    }

    private miniIdx = 0;
    private maxIdx = 0;
    private curOffset = 0;

    OnScroll() {
        //获取滚动视图相对于左上角原点的当前滚动偏移
        let scrollOffset: cc.Vec2 = this.Scroll.getScrollOffset();
        let offest = 0;
        if (this.scrollDir == ScrollDirEnum.Horizon)
            //水平的offset是负数，为什么会有这么sb的设计，将它取反和垂直方向的统一一下
            offest = -scrollOffset.x;
        else
            offest = scrollOffset.y;
        this.curOffset = offest;
        this.refresh();
    }

    //强行刷新
    public refresh() {
        let offest = this.curOffset;

        //最大高度，超过该高度，不刷新
        let maxY = this.needSize;
        if (offest < 0 || offest + this.visibleHeight >= maxY) {
            if (!this._isTriggerTopOrBottomEvent || this.Num < this.ItemNum) {
                return;
            }

            this._isTriggerTopOrBottomEvent = false;
            // 滚动顶部或底部回调
            this.onScrollToBottomOrTopCallback();
            return;
        }else{
            this._isTriggerTopOrBottomEvent = true;
        }
        
        let idx: number = 0;//从0开始
        this.countBorder(offest);
        let bRefresh = false;
        let midIdx = Math.floor(offest / this.distance);

        if (this.miniIdx != midIdx) {
            bRefresh = true;
        }

        this.miniIdx = midIdx;

        // console.error("this.miniIdx:" + this.miniIdx);

        this.minVisibleY = this.miniIdx * this.distance;
        this.maxVisibleY = this.maxIdx * this.distance;

        if (bRefresh) {
        // cc.info('--- miniIdx maxIdx' ,this.miniIdx , this.maxIdx);
            //miniIdx到maxIdx都会刷新
            for (let i = 0; i < this._itemNum; i++) {
                let obj = this.itemsList[i];
                idx = this.miniIdx + i;
                this.refreshItem(idx, i, obj);
            }
        }
        
        this.maxIdx = this.miniIdx + this._itemNum;
    }

    //idx是UI该刷新的第几个元素
    private refreshItem(idx, objIdx, obj) {
        if (idx < 0 || idx >= this.num)
            return;

        if (obj == null) {
            console.error("obj为空！");
            return;
        }
        let curX = 0;
        let curY = 0;
        if (this.scrollDir == ScrollDirEnum.Horizon)
            curX = this.initX + this.distance * idx;
        else
            curY = this.initY - this.distance * idx;
        // console.error("idx:" + idx + ",curX:" + curX + ",curY:" + curY);
        obj.setPositionX(curX);
        obj.setPositionY(curY);
        this.onRefresh(obj, idx, objIdx);
    }

    /**
     * 刷新回调
     * @param obj 
     * @param idx 需求显示的索引
     * @param objIdx 实际的item索引
     */
    protected onRefresh(obj, idx: number, objIdx) {
        if (this.OnScrollFun) this.OnScrollFun(obj, idx, objIdx);
        cc.info("--- onRefresh idx ", idx);

        if (idx == this._defaultSelectedIdx) {
            cc.info("--- default selected ", idx);

            let item: ScrollHelperItem = obj.getComponent(ScrollHelperItem);

            if (item.clickEventHandle) {
                item.clickEventHandle();
            }
        }
    }

    public removeAllItems(): void{
        this.content.removeAllChildren();
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-16
     * @Desc     重置scrollview
     */
    public resetList(): void{
        this.itemsList.length = 0;
        this.removeAllItems();
        this.Num = 0;
        this.ShowData = null;
        this.Init(this._itemNum);
        this.scrollToTop();
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-09-30
     * @Desc     刷新列表数据和显示
     */
    public refreshData(data: any): void{
        if (!data || !data.length) {
            cc.info('--- [ScrollHelper refreshData] data length is error');
            return;
        }

        this.Num = data.length;
        this.ShowData = data;
        this.Init(this._itemNum);
    }


    /**
     * @Author   WangHao
     * @DateTime 2018-09-11
     * @Desc     滚动到顶部
     */
    public scrollToTop() {
        if (this.Scroll) {
            this.Scroll.scrollToTop(0.1);
        }
    }
    
    /**
     * @Author   WangHao
     * @DateTime 2018-09-11
     * @Desc     滚动到底部
     */
    public scrollToBottom() {
        if (this.Scroll) {
            this.Scroll.scrollToBottom(0.1);
        }
    }
    
    /**
     * 滚动到顶部或底部回调
     */
    protected onScrollToBottomOrTopCallback(): void{
        if (this._scrollTopOrBottomEvent) {
            this._scrollTopOrBottomEvent();
        }

        cc.info("--- scrollToBottom");
    }



    /**
     * 注册滚动到顶部或底部事件回调
     */
    public registerScrollToTopOrBottonEvent(_event: Function): void{
        this._scrollTopOrBottomEvent = _event;
    }

    /*
     * 更新选中状态
     */
    public updateSelectedStatus(item: ScrollHelperItem): void{
        cc.info("--- updateSelectedStatus ", item.showData);
        
        if (!this._preSelectItem) {
            this._preSelectItem = item;
            item.selected();
            return;
        }

        item.selected();
        this._preSelectItem.cancelSelected();
        this._preSelectItem = item;
    }

    /**
     * 设置默认选中项(从0开始)
     */
    public setDefaultSelectedIdx(idx: number): void{
        if (idx >= this.Num || idx < 0) {
            cc.info("error: idx is error");
            return;
        }

        this._defaultSelectedIdx = idx
    }
}
