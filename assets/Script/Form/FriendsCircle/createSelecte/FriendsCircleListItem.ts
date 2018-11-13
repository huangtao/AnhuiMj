import { Action } from "../../../CustomType/Action";
import { FriendCircleInfo } from "../../../CustomType/FriendCircleInfo";
import { LoadHeader } from "../../../Tools/Function";

const { ccclass, property } = cc._decorator;
@ccclass
export class FriendsCircleListItem extends cc.Component {
    public action: Action = null;
    /**
     * 判断是加入还是进入
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
    circleNode: cc.Node=null;

    /**
     * 亲友圈ID
     */
    @property(cc.Label)
    circleID: cc.Label=null;

    /**
     * 亲友圈名称
     */
    @property(cc.Label)
    circleName: cc.Label=null;

    /**
     * 亲友成员数
     */
    @property(cc.Label)
    lab_userCount: cc.Label=null;

    /**
     * 亲友圈圈主头像
     */
    @property(cc.Sprite)
    headImg: cc.Sprite=null;

    /**
     * 亲有圈数据信息
     * @type {any}
     */
    private circleInfo: any = null;

    public onLoad(){
        this.refreshUI();
    }

    public refreshUI(){
        
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-02
     * @Desc     初始化界面显示数据
     * @param    {any}      data [description]
     */
    public setData(data: FriendCircleInfo){
        if (!data) {
            this.bJoin = true;
            this.circleNode.active = false;
            return;
        }

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
            this.circleID.string = '圈号：' + this._circleId;
            this.circleName.string = this._nickName;
            this.lab_userCount.string = '成员: ' + data.userCount;
        }

        if (this.headImg){
           LoadHeader(this._headUrl,this.headImg);
        }
    }

    public Show(root: cc.Node) {
        if (!(cc.isValid(root) && this.isValid)) {
            root = cc.Canvas.instance.node;
        }
        this.node.removeFromParent(true);
        root.addChild(this.node);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-07-31
     * @Desc     进入亲友圈
     */
    public enterBtnClickHandle(){
    	if (this.action) {
    		this.action.Run([{circleInfo:this.circleInfo,isJoin: this.bJoin}]);
    	}
    }
}