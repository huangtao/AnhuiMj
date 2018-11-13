import { MGMJMahjongDef, MGMJ } from "../ConstDef/MGMJMahjongDef";
import M_MGMJVideoClass from "../M_MGMJVideoClass";
import M_MGMJClass from '../M_MGMJClass';

const {ccclass, property} = cc._decorator;

@ccclass
export default class MGMJ_GameInfo extends cc.Component {

    @property(cc.Sprite)
    leftPaiBei:cc.Sprite = null;

    @property(cc.Label)
    lbl_leftCardNum: cc.Label=null;

    @property(cc.Node)
    GroupRoomInfo: cc.Node=null;

    // @property(cc.Node)
    // GroupLeftCard: cc.Node=null;

    @property(cc.Label)
    lbl_RoomInfo: cc.Label=null;

    @property(cc.Label)
    lbl_GameNum: cc.Label=null;

    private _leftCardNum:number;

    onLoad() {
        // init logic
        //this.init();
    }

    /**
     * 初始化
     * */
    public init():void{
        this.node.active=true;

        this._leftCardNum=136;
        if(MGMJ.ins.iclass.isVideo()){
            if(M_MGMJVideoClass.ins.TableConfig.IsBuKao){
                
                this._leftCardNum=136;
            }
        }else{
            if(M_MGMJClass.ins.TableConfig.IsBuKao){
            
                this._leftCardNum=136;
            }
        }

        this.lbl_leftCardNum.string = this._leftCardNum.toString();
  
        this.GroupRoomInfo.active=false;
        
        // this.GroupLeftCard.active=false;
    }
    
    /**
     * 设置桌子号
     * */
    public set tableCode(value:string){
        if(value.length > 0){
            this.GroupRoomInfo.active=true;
            if(M_MGMJClass.ins.TableConfig.tableWhere > 0){
                this.lbl_RoomInfo.string = "亲友房:" + value;    
            }else{
                this.lbl_RoomInfo.string = "房间号:" + value;
            }
        }
    }
    public SetGameNum(now:number,all:number):void{
        this.lbl_GameNum.string="局数:"+now+"/"+all;
    }
    /**
     * 抓牌结束
     * */
    public holdCardOver():void{
        this.leftCardNum = MGMJMahjongDef.gCardCount_Package - (MGMJMahjongDef.gCardCount_Active - 1) * MGMJMahjongDef.gPlayerNum;
        
        if(MGMJ.ins.iclass.isVideo()){
            if(M_MGMJVideoClass.ins.TableConfig.IsBuKao){
                this.leftCardNum = 136 - (MGMJMahjongDef.gCardCount_Active - 1) * MGMJMahjongDef.gPlayerNum;
            }

        }else{
            if(M_MGMJClass.ins.TableConfig.IsBuKao){
                this.leftCardNum = 136 - (MGMJMahjongDef.gCardCount_Active - 1) * MGMJMahjongDef.gPlayerNum;
            }
        }

    }
    /**
     * 玩家抓了一张牌
     * */
    public holdACard():void{
        // this.GroupLeftCard.active=true;
        if(this._leftCardNum > 0){
            this.leftCardNum = this._leftCardNum - 1;
        }
    }
    /**
     * 抓一定数量的牌
     * */
    public holdNumCard(holdNum:number):void{
        // this.GroupLeftCard.active=true;
        this.leftCardNum = this._leftCardNum - holdNum;
    }
    /**
     * 设置剩余牌张数
     * */
    public set leftCardNum(cardNum:number){
        // this.GroupLeftCard.active=true;
        this._leftCardNum = cardNum;
        this.lbl_leftCardNum.string=this._leftCardNum.toString();
    }
}
