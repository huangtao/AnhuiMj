import LQMJEvent from "../LQMJEvent";
import { LQMJ } from "../ConstDef/LQMJMahjongDef";
import { SetTextureRes } from "../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LQMJ_La extends cc.Component {

    @property(cc.Button)
    btn_la_1: cc.Button=null;

    @property(cc.Button)
    btn_la_2: cc.Button=null;

    @property(cc.Button)
    btn_la_0: cc.Button=null;

    @property(cc.Sprite)
    img_la_1: cc.Sprite=null;

    @property(cc.Sprite)
    img_la_2: cc.Sprite=null;

    @property(cc.Sprite)
    img_la_0: cc.Sprite=null;

    onLoad() {
        // init logic

        
    }

    public init():void{
        this.node.active=false;
    }

    onEnable(){
        if(LQMJ.ins.iclass.getBankerChair()==LQMJ.ins.iclass.getSelfChair()){
            //自己是庄家，坐
            let url="";
            url=`gameres/M_LQMJ/Texture/LaPaoZuo/zuoyi`;
            SetTextureRes(url,this.img_la_1);
            url=`gameres/M_LQMJ/Texture/LaPaoZuo/zuoer`;
            SetTextureRes(url,this.img_la_2);
            url=`gameres/M_LQMJ/Texture/LaPaoZuo/buzuo`;
            SetTextureRes(url,this.img_la_0);
        }
        else{
            let url="";
            url=`gameres/M_LQMJ/Texture/LaPaoZuo/layi`;
            SetTextureRes(url,this.img_la_1);
            url=`gameres/M_LQMJ/Texture/LaPaoZuo/laer`;
            SetTextureRes(url,this.img_la_2);
            url=`gameres/M_LQMJ/Texture/LaPaoZuo/bula`;
            SetTextureRes(url,this.img_la_0);
        }
    }
    

    private La1():void{
        this.onLaDian(1);
    }
    private La2():void{
        this.onLaDian(2);
    }
    private La0():void{
        this.onLaDian(0);
    }

    private onLaDian(point : number)
    {
        this.node.dispatchEvent(new LQMJEvent(LQMJEvent.msg_la, point));
        this.node.active=false;
    }
}
