import { LoadHeader } from "../../Tools/Function";
import GameLogic from "./MJ_Function";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ_ReadyUser extends cc.Component {

    @property(cc.Sprite)
    img_touxiang:cc.Sprite = null;

    @property(cc.Label)
    lbl_account: cc.Label=null;

    @property(cc.Sprite)
    img_face: cc.Sprite=null;

    @property(cc.Sprite)
    img_tableowenr: cc.Sprite=null;

    @property(cc.Sprite)
    img_offline: cc.Sprite=null;

    @property(cc.Sprite)
    img_look: cc.Sprite=null;

    @property(cc.Node)
    group_money: cc.Node=null;

    @property(cc.Label)
    lbl_money: cc.Label=null;

    @property(cc.Animation)
    img_guzhang:cc.Animation=null;

    private gender:number;

    private animation: cc.Animation=null;

    onLoad() {
        // init logic
        //this.init();
        this.img_guzhang.node.active=false;
    }

    public init():void{
        this.img_face.node.active=false;
        this.img_offline.node.active=false;
        this.img_tableowenr.node.active=false;
        this.lbl_account.node.active=false;
        this.group_money.active=false;
        this.img_look.node.active=false;
        this.animation = this.img_look.addComponent<cc.Animation>(cc.Animation);
        this.gender=0;
    }

    public Clear():void{
        this.img_face.node.active=false;
        this.img_offline.node.active=false;
        this.img_tableowenr.node.active=false;
        this.lbl_account.node.active=false;
        this.group_money.active=false;
        this.img_look.node.active=false;
        this.animation.stop();
        this.gender=0;
        this.img_guzhang.stop();
        this.img_guzhang.node.active =false;
        // this.img_touxiang.node.active = false;
    }

    onDisable():void{
        this.AniEmojiFinish();
    }

    public SetUserInfo(faceID: string, name: string, gender: number):void{   
        this.gender=gender; 
        this.lbl_account.string = name;
        LoadHeader(faceID, this.img_face);
        this.img_face.node.active=true;
        this.lbl_account.node.active=true;
        this.node.active = true;
    }

    public SetTableowenr():void{
        this.img_tableowenr.node.active=true;
    }
    public HideTableowenr():void{
        this.img_tableowenr.node.active=false;
    }

    public Setoffline():void{
        this.img_offline.node.active=true;
    }
    public Hideoffline():void{
        this.img_offline.node.active=false;
    }

    public ShowMoney(value:boolean):void{
        this.group_money.active=value;
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
