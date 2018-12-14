import ScrollHelperItem from "../../../utils/ScrollHelperItem";
import { LoadHeader } from "../../../Tools/Function";
import FriendCircleDataCache from "../FriendCircleDataCache";
import { MillisSecondToDate } from "../../../Tools/Function";
import { Action } from "../../../CustomType/Action";
import SelectDateItem from "./SelectDateItem";
import Global from "../../../Global/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectDate extends cc.Component {
    /**
     * 小时预制体
     */
    @property(cc.Prefab)
    prefab_hour: cc.Prefab = null;

    /**
     * 标签选中状态图标
     */
    @property(cc.Sprite)
    sp_selectedStatus: cc.Sprite = null;

    /**
     * 小时选择容器
     */
    @property(cc.Layout)
    layout_hours: cc.Layout = null;

    /**
     * 开始日期标签按钮节点
     */
    @property([cc.Button])
    btn_tab: cc.Button[] = [];

    /**
     * 开始日期标签按钮节点
     */
    @property(cc.Label)
    lab_beginDay: cc.Label = null;

    /**
     * 结束日期标签按钮节点
     */
    @property(cc.Label)
    lab_endDay: cc.Label = null;

    /**
     * 开始时间左边箭头
     */
    @property(cc.Button)
    btn_begin_leftArrow: cc.Button = null;

    /**
     * 开始时间右边边箭头
     */
    @property(cc.Button)
    btn_begin_rightArrow: cc.Button = null;

    /**
     * 结束时间左边箭头
     */
    @property(cc.Button)
    btn_end_leftArrow: cc.Button = null;

    /**
     * 开始时间右边边箭头
     */
    @property(cc.Button)
    btn_end_rightArrow: cc.Button = null;

    /**
     * 当前选择的小时
     */
    private _hourInfo = {beginTime: "", endTime: ""};

    private _idx: number = null;

    public get Idx(): number {
        return this._idx;
    }

    /**
     * 选择日期按钮回调
     */
    private _selectTimeAct: Action = null;
    public set SelectTimeAct(act: Action) { this._selectTimeAct = act };

    private _curSelectDateStr: string = ""; 
    private _curSelectHourItem: SelectDateItem = null;

    /**
     * 开始时间索引
     */
    private _curBeginDayIndx: number = 0;

    /**
     * 结束时间索引
     */
    private _curEndDayIndx: number = 0;

    /**
     * 当前选中的标签索引
     */
    private _curSelectTabIdx: number = 0;

    public initUI() {
        // 设置开始和结束时间默认为当天
        this._curBeginDayIndx = 0;
        this._curEndDayIndx = 0;
        this._curSelectTabIdx = 0;
        this._curSelectHourItem = null;
        // 默认选中开始标签标签
        this.sp_selectedStatus.node.x = this.btn_tab[0].node.x;

        this.layout_hours.node.removeAllChildren();

        // 默认选中第一个标签
        this.tabDateClickEvent(null, "0");

        // 创建小时选择列表
        this.creatHourListShow();

       // 默认显示今天的日期
       this.lab_beginDay.string = this.getDateFormat(new Date().getTime());
       this.lab_endDay.string = this.getDateFormat(new Date().getTime());

       // 默认右边的箭头按钮
       this.btn_begin_leftArrow.node.active = true;
       this.btn_begin_rightArrow.node.active = false;
       this.btn_end_leftArrow.node.active = true;
       this.btn_end_rightArrow.node.active = false;
    }

    /** 
     * 日期格式化
     */
    private getDateFormat(time: number): string {
        // 截取字符串到小时 2018-12-02 12
        let getHourStr = function(time): string {
            let dateStr = MillisSecondToDate(time);// 格式:2018-12-02 12:30:30
            dateStr = dateStr.substr(0,dateStr.indexOf(":"));
            return dateStr;
        }

        // 截取字符串到天 2018-12-02
        let getDayStr = function(time): string {
            let dateStr = getHourStr(time);
            let dayStr = dateStr.substr(0,dateStr.indexOf(" "));
            return dayStr;
        }

        let curSelectTime = new Date(time);

        // 获取当前选择的日期
        let dayStr = getDayStr(curSelectTime);
        dayStr = dayStr.substr(dayStr.indexOf("-") + 1, dayStr.length);
        return dayStr;
    }

    /**
     * 创建小时选择列表
     */
    private creatHourListShow() {
        // 创建小时选择列表
        for (var idx = 0; idx < 24; ++idx) {
            let item = cc.instantiate(this.prefab_hour);
            let hourItem = item.getComponent(SelectDateItem);

            if (idx < 10) {
                hourItem.setText("0" + idx);
            } else {
                hourItem.setText(idx + "");
            }

            if (1 == idx) {
                // 默认选中"01"时刻
                hourItem.setSelected(true);
                this._hourInfo.beginTime = "0" + idx;
                this._curSelectHourItem = hourItem;
            } else {
                hourItem.setSelected(false);
            }

            hourItem.ClickAct = new Action(this,this.selectHourAct);
            this.layout_hours.node.addChild(item);
        }
    }

    /**
     * 选择小时回调
     */
    private selectHourAct( item: SelectDateItem ){
        if (this._curSelectHourItem == item) {
            return;
        }

        cc.log("-- select hour ", item.Value);

        if (0 == this._curSelectTabIdx) {
            this._hourInfo.beginTime = item.Value;
        } else if(1 == this._curSelectTabIdx) {
             this._hourInfo.endTime = item.Value;
        }

        if (!this._curSelectHourItem) {
            this._curSelectHourItem = item;
        } else {
            this._curSelectHourItem.setSelected(false);
            item.setSelected(true);
            this._curSelectHourItem = item;
        }

        if (1 == this._curSelectTabIdx) {
            this._curSelectDateStr;
            this.returnSelectTime();
        }
    }

    /**
     * 返回选择的时间
     */
    private returnSelectTime() {
        if (this._curBeginDayIndx < this._curEndDayIndx) {
            Global.Instance.UiManager.ShowTip("开始时间不能大于结束时间");
            return
        }

        this.node.active = false;

        if (this._selectTimeAct) {
            this._selectTimeAct.Run([
                { 
                    beginTime:this.lab_beginDay.string + " " + this._hourInfo.beginTime,
                    endTime:this.lab_endDay.string + " "+ this._hourInfo.endTime
             }]);
        }
    }

    /**
     * 开始、结束时间切换事件
     */
    private tabDateClickEvent(event, args){
        if (this._curSelectTabIdx == parseInt(args)) {
            return;
        }

        // 更新标签选中状态
        this.sp_selectedStatus.node.x = this.btn_tab[parseInt(args)].node.x;
        this._curSelectTabIdx = parseInt(args);
    }

    /**
     * 选择上一天按钮事件
     */
    private btnSelectPreDayClickEvent(event, args){
        if ("begin" == args) {
            if (++ this._curBeginDayIndx >= 2) {
                // 隐藏左侧按钮
                this.btn_begin_leftArrow.node.active = false;
                this._curBeginDayIndx = 2;
            } else {
                this.btn_begin_rightArrow.node.active = true;
            }

            let time = new Date().getTime() - 24 * (this._curBeginDayIndx) * 3600 * 1000;

            // 更新左侧标签日期展示
            this.lab_beginDay.string = this.getDateFormat(time);
        }

        if ("end" == args) {
            if (++ this._curEndDayIndx >= 2) {
                // 隐藏左侧按钮
                this.btn_end_leftArrow.node.active = false;
                this._curEndDayIndx = 2;
            } else {
                this.btn_end_rightArrow.node.active = true;
            }

            let time = new Date().getTime() - 24 * (this._curEndDayIndx) * 3600 * 1000;
            
            // 更新左侧标签日期展示
            this.lab_endDay.string = this.getDateFormat(time);
        }        
    }

    /**
     * 选择下一天按钮事件
     */
    private btnSelectNextDayClickEvent(event, args){
        if ("begin" == args) {
            if (-- this._curBeginDayIndx <= 0) {
                // 隐藏右侧按钮
                this.btn_begin_rightArrow.node.active = false;
                this._curBeginDayIndx = 0;
            } else {
                this.btn_begin_leftArrow.node.active = true;
            }

            let time = new Date().getTime() - 24 * (this._curBeginDayIndx) * 3600 * 1000;
            // 更新左侧标签日期展示
            this.lab_beginDay.string = this.getDateFormat(time);
        }

        if ("end" == args) {
            if (-- this._curEndDayIndx <= 0) {
                // 隐藏右侧按钮
                this.btn_end_rightArrow.node.active = false;
                this._curEndDayIndx = 0;
            } else {
                this.btn_end_leftArrow.node.active = true;
            }

            let time = new Date().getTime() - 24 * (this._curEndDayIndx) * 3600 * 1000;
            // 更新左侧标签日期展示
            this.lab_endDay.string = this.getDateFormat(time);
        }
    }

    /**
     * 关闭该界面
     */
    private closeClick() {
        this.node.active = false;
    }
}
