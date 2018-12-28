import {CardType} from "../GameHelp/PDK_GameHelp"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Ani_CardType extends cc.Component {

    @property(cc.Node)
    private Animation: cc.Node[] = [];
    onLoad(){
       this.HideAllAni();
    }
    //隐藏所有特效
    public HideAllAni(){
        for(let i = 0;i<this.Animation.length;i++){
            if(this.Animation[i].active){
                this.Animation[i].active = false;
                this.Animation[i].getComponent(cc.Animation).stop();
            }
        }
    }
    //播放牌型文字特效动画
    public playAni(type:CardType,chair:number,Pos:cc.Vec2,cardCount){
        let AniItem:cc.Node = null;
        switch(type){
            case CardType.lianDui:
                if(cardCount == 6){
                    AniItem = this.Animation[8];
                }else{
                    AniItem = this.Animation[0];  
                }
            break;
//            case CardType.ThreeAndTwo:
//                AniItem = this.Animation[1];+
//            break;
            case CardType.FourAndTwo:
                AniItem = this.Animation[2];
            break;
            case CardType.ShunZi:
                AniItem = this.Animation[4];
            break;
            case CardType.Plane:
                AniItem = this.Animation[5];
            break;
            case CardType.Bomb:
                AniItem = this.Animation[6];
            break;
            case CardType.chuantian:
                AniItem = this.Animation[7];
            break;
            case CardType.baopei:
                AniItem = this.Animation[9];
            break;
        }
        if(AniItem){
            this.HideAllAni();
            let position = Pos;
            if(type == CardType.chuantian || type == CardType.Plane || type == CardType.Bomb){
                position = new cc.Vec2(0,0);
            }else if(type == CardType.baopei){
                position = new cc.Vec2(0,-180);
            }else{
                if(chair == 0){
                    position = new cc.Vec2(Pos.x + 535,Pos.y + 300);
                }else if(chair == 1){
                    position = new cc.Vec2(Pos.x + -258,Pos.y + 0);
                }else if(chair == 2){
                    position = new cc.Vec2(Pos.x + 0,Pos.y - 140);
                }else{
                    position = new cc.Vec2(Pos.x + 258,Pos.y + 0);
                }
            }
            AniItem.active = true;
            AniItem.setPosition(position);
            AniItem.getComponent(cc.Animation).play();
            AniItem.getComponent(cc.Animation).on('finished',  this.HideAllAni,this);;
        }
    }

}
