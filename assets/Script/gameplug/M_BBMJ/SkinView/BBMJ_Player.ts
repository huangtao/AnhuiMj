
import MJ_ChatContext from "../../MJCommon/MJ_ChatContext";
import MJ_UserGamingScore from "../../MJCommon/MJ_UserGamingScore";
import { LoadHeader } from "../../../Tools/Function";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import GameLogic, { SetTextureRes } from "../../MJCommon/MJ_Function";
import { BBMJMahjongAlgorithm } from "../BBMJMahjongAlgorithm/BBMJMahjongAlgorithm";
import { BBMJ } from "../ConstDef/BBMJMahjongDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BBMJ_Player extends cc.Component {

    @property(MJ_ChatContext)
    userChat:MJ_ChatContext=null;

    @property(MJ_UserGamingScore)
    userScore:MJ_UserGamingScore=null;

    @property(cc.Sprite)
    img_face:cc.Sprite=null;

    @property(cc.Sprite)
    img_offline:cc.Sprite=null;

    @property(cc.Sprite)
    img_banker:cc.Sprite=null;

    @property(cc.Sprite)
    img_tableowner:cc.Sprite=null;



    @property(cc.Label)
    lbl_account:cc.Label=null;

    @property(cc.Label)
    lbl_allaccount: cc.Label=null;

    @property(cc.Sprite)
    img_look:cc.Sprite=null;

    @property(cc.Node)
    group_money: cc.Node=null;

    @property(cc.Label)
    lbl_money: cc.Label=null;

    @property(cc.Node)
    group_ready: cc.Node=null;

    @property(cc.Node)
    group_gaming: cc.Node=null;

    @property(cc.Sprite)
    lbl_ting:cc.Sprite=null;
    @property(cc.Animation)
    img_guzhang:cc.Animation=null;

    private gender=0;

    private animation: cc.Animation=null;

    onLoad() {
        // init logic
        // cc.log("onLoad玩家信息初始化");
        // this.init();
    }

    public init():void{
        this.userChat.init();
        this.userScore.init();
        this.img_face.node.active=false;
        this.img_offline.node.active=false;
        this.img_banker.node.active=false;
        this.img_tableowner.node.active=false;
        
        this.img_look.node.active=false;
        this.lbl_account.node.active=false;
        this.lbl_allaccount.node.active=false;
        this.group_money.active=false;
        this.lbl_ting.node.active=false;
        this.animation = this.img_look.addComponent<cc.Animation>(cc.Animation);
        cc.log("玩家信息初始化");
    }

    public Clear():void{
        this.userChat.init();
        this.userScore.init();
        this.img_face.node.active=false;
        this.img_offline.node.active=false;
        this.img_banker.node.active=false;
        this.img_tableowner.node.active=false;
        this.lbl_ting.node.active=false;
        this.img_look.node.active=false;
        this.lbl_account.node.active=false;
        this.lbl_allaccount.node.active=false;
        this.group_money.active=false;
        this.animation.stop();
        this.img_guzhang.stop();
        this.img_guzhang.node.active =false;
    }

    onDisable():void{
        this.AniEmojiFinish();
    }

    public playerLook(value: cc.AnimationClip):void{
        this.img_look.node.active = true;
        value.name = "Emoji";
        this.animation.stop();
        this.unschedule(this.AniEmojiFinish);
        var clips = this.animation.getClips();
        for (var i = 0; i < clips.length; i++) {
            this.animation.removeClip(clips[i]);
        }
        this.animation.addClip(value);
        this.animation.play("Emoji");
        this.scheduleOnce(this.AniEmojiFinish, 3);
    }

    private AniEmojiFinish() {
        this.animation.stop();
        this.img_look.node.active = false;
    }

    public SetTing():void{
        this.lbl_ting.node.active=true;
    }

    public HideTing():void{
        if(this.lbl_ting.node.active == true){
            this.lbl_ting.node.active=false;
        }
        
    }
        public ShowGuZhang(){
        this.img_guzhang.node.active = true;
        this.img_guzhang.play();
        this.scheduleOnce(this.AniGuZhangFinish, 2);
    }
        private AniGuZhangFinish() {
        this.img_guzhang.stop();
        this.img_guzhang.node.active = false;
    }
    /**
     * 
     * @param player 玩家信息
     * @param readyOrgaming 准备或游戏中 准备为true
     */
    public SetPlayer(player: QL_Common.TablePlayer,readyOrgaming:boolean):void{  
        this.group_gaming.active=false;
        this.group_ready.active=false; 
        this.gender=player.Gender; 
        let ss="";
        let le=BBMJMahjongAlgorithm.strLen(player.NickName)
        if(readyOrgaming){
            if(le > 16){
                ss = player.NickName.substring(0,12) + "...";
            }else{
                ss = player.NickName;
            }
        }else{
            if( le > 4){
                ss = player.NickName.substring(0,4) + "...";
            }else{
                ss = player.NickName;
            }
        }
        
        this.lbl_account.string = ss;
        this.lbl_allaccount.string =player.NickName;
        LoadHeader(player.FaceID, this.img_face);
        this.img_face.node.active=true;
        this.lbl_account.node.active=true;
        this.lbl_allaccount.node.active=true;
        if(readyOrgaming){
            this.group_ready.active=true;
        }else{
            this.group_gaming.active=true;
        }
        this.node.active = true;
    }

    public SetTableowenr():void{
        this.img_tableowner.node.active=true;
    }
    public HideTableowenr():void{
        this.img_tableowner.node.active=false;
    }

    public Setoffline():void{
        this.img_offline.node.active=true;
    }
    public Hideoffline():void{
        this.img_offline.node.active=false;
    }

    public ShowChat(msg:string):void{
        this.userChat.ShowChat(msg);
    }

    public ShowScore(value:boolean):void{
        this.userScore.node.active=value;
    }

    public SetScore(score:number):void{
        this.userScore.showUserScore(score,BBMJ.ins.iclass.getTableConfig().isValid);
    }

    public AddScore(score:number):void{
        this.userScore.addUserScore(score,BBMJ.ins.iclass.getTableConfig().isValid);
    }

    public SetBanker():void{
        this.img_banker.node.active=true;
    }
    public HideBanker():void{
        this.img_banker.node.active=false;
    }

    public ShowLaAndPao(value:boolean):void{
        // this.img_la.node.active=value;
        // this.img_pao.node.active=value;
    }

    public SetLa(score:number):void{
        // cc.log("设置拉"+score);
        // let url="";
        // if(score>=0 && score<=2){
        //     url=`gameres/M_BBMJ/Texture/LaPaoZuo/hong${score}`;
        //     cc.log(url);
        //     SetTextureRes(url,this.img_la);
        //     this.img_la.node.active=true;
        // }
        
    }

    public SetPao(score:number):void{
        // let url="";
        // if(score>=0 && score<=2){
        //     url=`gameres/M_BBMJ/Texture/LaPaoZuo/huan${score}`;
        //     SetTextureRes(url,this.img_pao);
        //     this.img_pao.node.active=true;
        // }
        
    }


    public ShowMoney(value:boolean):void{
        this.group_money.active=value;
    }
    public SetMoney(money:number):void{
        if (money.toString().length > 9)
            this.lbl_money.string = money.toString().substring(0, 6) + "..";
        else if (money.toString().length > 7)
            this.lbl_money.string = GameLogic.FomatInt(money);
        else if (money.toString().length > 5)
            this.lbl_money.string = GameLogic.FomatDecimal(money);
        else
            this.lbl_money.string = money.toString();
    }
}

