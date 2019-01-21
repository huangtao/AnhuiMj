import { Action } from "../../../CustomType/Action";
import { FriendCircleInfo } from "../../../CustomType/FriendCircleInfo";
import { LoadHeader } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;
@ccclass
export class FriendsCircleListItem extends cc.Component {
    // 亲友圈按钮点击事件回调
    public clickAction: Action = null;
    
    /**
     * 判断是加入还是选择
     * @type {Boolean}
     */
    public bJoin: Boolean = false;
    /**
     * [circleId 亲友圈ID]
     * @type {string}
     */
    private _circleId: string;
    /**
     * [nickName 亲友圈名称]
     * @type {string}
     */
    private _nickName: string;
    /**
     * [headUrl 亲友圈头像]
     * @type {string}
     */
    private _headUrl: string;

    /**
     * Item面板
     */
    @property(cc.Node)
    circleNode: cc.Node = null;

    /**
     * 亲友圈ID
     */
    @property(cc.Label)
    circleID: cc.Label = null;

    /**
     * 亲友圈名称
     */
    @property(cc.Label)
    circleName: cc.Label = null;

    /**
     * 亲友成员数
     */
    @property(cc.Label)
    lab_userCount: cc.Label = null;

    /**
     * 亲友圈圈主头像
     */
    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    /**
     * 选中状态图片
     */
    @property(cc.Sprite)
    sp_selectStatus: cc.Sprite = null;

    /**
     * 未选中状态图片
     */
    @property(cc.Sprite)
    sp_noSelectStatus: cc.Sprite = null;

    /**
     * 加入亲友圈按钮
     */
    @property(cc.Sprite)
    sp_add: cc.Sprite = null;

    /**
     * 红点节点
     */
    @property(cc.Node)
    node_redPoint: cc.Node = null;

    /**
     * 亲有圈数据信息
     * @type {any}
     */
    private circleInfo: FriendCircleInfo = null;

    public onLoad() {
        
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-02
     * @Desc     初始化界面显示数据
     * @param    {any}      data [description]
     */
    public setData(data: FriendCircleInfo) {
        // 初始化状态显示
        if (this.sp_noSelectStatus && this.sp_selectStatus) {
            this.sp_noSelectStatus.node.active = true;
            this.sp_selectStatus.node.active = false;
        }

        // 加号按钮默认显示
        if (this.sp_add) {
            this.sp_add.node.active = true;
        }

        // 红点节点  
        if (this.node_redPoint) {
            this.node_redPoint.active = false;
        }

        if (!data) {
            this.bJoin = true;
            this.circleNode.active = false;
            return;
        }

        this.sp_add.node.active = false;
        this.circleNode.active = true;

        // 亲友圈ID
        if (data.ID) {
            this._circleId = data.ID;
        }

        // 亲友圈昵称
        if (data.name) {
            this._nickName = data.name;
        }

        // 亲友圈头像
        if (data.header) {
            this._headUrl = data.header;
        }

        this.circleInfo = data;

        if (this.circleID && this.circleName && this.lab_userCount) {
            this.circleID.string = '圈号:' + this._circleId;
            this.circleName.string = this._nickName;
            this.lab_userCount.string = " (" + data.userCount +"人)";
        }

        if (this.headImg) {
            LoadHeader(this._headUrl, this.headImg);
        }      
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-11-06
     * @Desc     选中状态
     * @param    {cc.Node}  root [description]
     */
    public setSelectedStatusShow() {
        // 选中状态显示
        if (this.sp_noSelectStatus && this.sp_selectStatus) {
            this.sp_noSelectStatus.node.active = false;
            this.sp_selectStatus.node.active = true;
        }
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-11-08
     * @Desc     取消选中
     */
    public cancelSelectedShow() {
        // 选中状态显示
        if (this.sp_noSelectStatus && this.sp_selectStatus) {
            this.sp_noSelectStatus.node.active = true;
            this.sp_selectStatus.node.active = false;
        }
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-11-15
     * @Desc     设置选中
     */
    public setSelected() {
        this.enterBtnClickHandle();
    }

    /**
     * 更新红点可见性
     */
    public redPointisVisible( visible: boolean ) {
        if (this.node_redPoint) {
            this.node_redPoint.active = visible;
        }
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-07-31
     * @Desc     进入亲友圈
     */
    public enterBtnClickHandle() {
        if (this.clickAction) {
            this.clickAction.Run([{ item: this, circleInfo: this.circleInfo, isJoin: this.bJoin }]);
        }
    }
}