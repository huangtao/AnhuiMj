import UIBase from "../Base/UIBase";
import { UIName } from "../../Global/UIName";
import { Uyi_Common } from "../../CommonSrc/Uyi_Common";
import { TranslateMoneyTypeName } from "../../Tools/Function";

const { ccclass, property } = cc._decorator;

@ccclass
export class SignInItem extends UIBase<any> {
    //签到数据
    signInData: SignInData;
    @property(cc.Label)
    lbl_title: cc.Label = null;
    @property(cc.Label)
    lbl_count: cc.Label = null;
    @property(cc.Sprite)
    img_coin: cc.Sprite = null;
    @property(cc.Sprite)
    img_today: cc.Sprite = null;
    @property(cc.Sprite)
    img_before: cc.Sprite = null;

    public get UIname() {
        return UIName.SignIn;
    }
    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    ShowMask(){
        this.img_before.enabled=true;
        this.img_before.node.scale=0;
        const action=cc.scaleTo(0.5,1,1) ;
        this.img_before.node.runAction(action);
    }
    Init() {
        const day = this.UserInfo.userData.ContinuityDays>6?7: this.UserInfo.userData.ContinuityDays+ 1;
        const dayArr = ["", "第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "满勤"];
        if (day > this.signInData.SignDay) {
            this.img_today.enabled = false;
        } else if (day === this.signInData.SignDay) {
            this.img_before.enabled = false;
        } else if (day < this.signInData.SignDay) {
            this.img_today.enabled = false;
            this.img_before.enabled = false;
        }
        cc.loader.loadRes(`Texture/Hall/SignIn/coin_0${this.signInData.SignDay}`, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            this.img_coin.spriteFrame = spriteFrame;
        }.bind(this));
        this.lbl_count.string = TranslateMoneyTypeName(this.signInData.MoneyType) + "x" + this.signInData.MoneyNum;
        // if (day == this.signInData.SignDay) {//今天
        //     this.lbl_title.node.color = cc.color(255, 255, 255);
        //     // this.lbl_title.getComponent<cc.LabelOutline>(cc.LabelOutline).color = cc.color(0, 0, 0);
        // }
        this.lbl_title.string = dayArr[this.signInData.SignDay];//day == this.signInData.SignDay ? "今天" : dayArr[this.signInData.SignDay];
    }

}
export class SignInArr {
    d: any[][];
    status: string;
    msg: string;
}
export class SignInData {
    /**
      *第几天
      */
    public SignDay: number = 0;
    /**
      *状态：0关闭，1开启
      */
    public Status: number = 0;
    /**
      *赠送币种
      */
    public MoneyType: Uyi_Common.CurrencyType = 0;
    /**
      *赠送数量
      */
    public MoneyNum: number = 0;
}