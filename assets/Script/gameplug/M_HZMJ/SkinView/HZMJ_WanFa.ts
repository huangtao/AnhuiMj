

const {ccclass, property} = cc._decorator;
import M_HZMJClass from "../M_HZMJClass";
@ccclass
export default class HZMJ_WanFa extends cc.Component {
    //房号
    @property(cc.Label)
    roomNub: cc.Label = null;
    //局数
    @property(cc.Label)
    juShuNub: cc.Label = null;
    //房费
    @property(cc.Label)
    payWay: cc.Label = null;
    //规则
    @property(cc.Label)
    guiZe: cc.Label = null;
    //码数
    @property(cc.Label)
    maShu: cc.Label = null;
    //玩法
    @property(cc.Label)
    playMethod: cc.Label = null;

   

    // onLoad () {}

  public showWanFa():void{    
      if(this.node.active){
        this.node.active=false;
      }
      else{
        this.node.active=true;
      }  
    this.roomNub.string=M_HZMJClass.ins.RoomNum;
    this.juShuNub.string=String(M_HZMJClass.ins.JuShu);
    if(M_HZMJClass.ins.ifFZPay){
       this.payWay.string="房主支付";
    }
    else{
       this.payWay.string="AA支付"; 
    }
  }  
    public WanFaClose():void{  
          this.node.active=false;
    }
}
