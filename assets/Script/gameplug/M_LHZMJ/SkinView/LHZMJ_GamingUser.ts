
import MJ_ChatContext from "../../MJCommon/MJ_ChatContext";
import MJ_UserGamingScore from "../../MJCommon/MJ_UserGamingScore";
import { LoadHeader } from "../../../Tools/Function";
import { QL_Common } from "../../../CommonSrc/QL_Common";
import { SetTextureRes } from "../../MJCommon/MJ_Function";
import { LHZMJ } from "../ConstDef/LHZMJMahjongDef";
import { LHZMJMahjongAlgorithm1 } from "../LHZMJMahjongAlgorithm/LHZMJMahjongAlgorithm1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LHZMJ_GamingUser extends cc.Component {

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

    @property(cc.Sprite)
    img_look:cc.Sprite=null;


    private gender=0;

    private animation: cc.Animation;

    onLoad() {
        // init logic
        // console.log("onLoad玩家信息初始化");
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

        this.animation = this.img_look.addComponent<cc.Animation>(cc.Animation);
        console.log("玩家信息初始化");
    }

    public Clear():void{
        this.userChat.init();
        this.userScore.init();
        this.img_face.node.active=false;
        this.img_offline.node.active=false;
        this.img_banker.node.active=false;
        this.img_tableowner.node.active=false;

        this.img_look.node.active=false;
        this.lbl_account.node.active=false;

        this.animation.stop();
    }

    onDisable():void{
        this.AniEmojiFinish();
    }

    public playerLook(value: cc.AnimationClip):void{
        this.img_look.node.active = true;
        value.name = "Emoji";
        this.animation.stop();
        this.unscheduleAllCallbacks();
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

    public SetPlayer(player: QL_Common.TablePlayer):void{   
        this.gender=player.Gender; 
        let ss="";
        let le=LHZMJMahjongAlgorithm1.strLen(player.NickName)
        if( le > 3){
            ss = player.NickName.substring(0,3) + "...";
            // if(le > 8){
            //     ss += player.NickName.substring(4,8) + "...";
            // }else{
            //     ss += player.NickName.substring(4,le);
            // }
            
        }else{
            ss = player.NickName;
        }
        this.lbl_account.string = ss;
        LoadHeader(player.FaceID, this.img_face);
        this.img_face.node.active=true;
        this.lbl_account.node.active=true;
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
        this.userScore.showUserScore(score,LHZMJ.ins.iclass.getTableConfig().isValid);
    }

    public AddScore(score:number):void{
        this.userScore.addUserScore(score,LHZMJ.ins.iclass.getTableConfig().isValid);
    }

    public SetBanker():void{
        this.img_banker.node.active=true;
       
        
    }
    public SetTing():void{

    }
    public HideBanker():void{
        this.img_banker.node.active=false;
    }
    public HideTing():void{

    }
    public ShowLaAndPao(value:boolean):void{

    }

    public SetLa(score:number):void{

    }

    public SetPao(score:number):void{

    }
}
