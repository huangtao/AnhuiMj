
import { LoadHeader } from "../../../Tools/Function";
import { SetTextureRes } from "../GameHelp/PDK_baseFunction";
import { CommonTexturePath } from "../GameHelp/PDK_GameHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinTotalScoreItem extends cc.Component {

    private img_bg: cc.Sprite;
    @property(cc.Sprite)
    private img_face: cc.Sprite=null;
    @property(cc.Sprite)
    private img_fangzhu: cc.Sprite=null;
    @property(cc.Label)
    private label_name: cc.Label=null;
    @property(cc.Label)
    private label_info: cc.Label=null;
    @property(cc.Label)
    private label_score: cc.Label=null;
    @property(cc.Label)
    private label_jian: cc.Label = null;

    @property(cc.Sprite)
    private img_maxwin: cc.Sprite=null;
    @property([cc.Label])
    private people_info:cc.Label[] = [];
    onLoad() {
        this.img_bg = this.getComponent<cc.Sprite>(cc.Sprite);
    }
    public Show(isTableCreator:boolean,faceID: string, name: string, gamecount: number, userID: number, score: number,winCount:number,bomb: number,zhuaNiao: number,menGuo: number, maxwin: boolean = false) {
   //     this.SetBg(userID == selfID);
        this.img_face.spriteFrame = null;
        LoadHeader(faceID, this.img_face);
        this.img_face.node.width = 68;
        this.img_face.node.height = 68;
        if( name.length > 5){
            name = name.substring(0,5) + "...";            
        }
        this.label_name.string = name;
        this.label_info.string = "ID:" + userID;
        if(score>=0){
            this.label_score.node.active = true;
            this.label_score.string = score + "";
        }else{
            this.label_jian.node.active = true;
            this.label_jian.string = score + "";
        }
        
        this.img_maxwin.node.active = maxwin;

        this.people_info[0].string = "x"+winCount;
        this.people_info[1].string = "x"+bomb;
        this.people_info[2].string = "x"+menGuo;
        this.people_info[3].string = "x"+zhuaNiao;

        this.img_fangzhu.node.active = isTableCreator;
    }
    private SetBg(value: boolean) {
        if (value) {
            SetTextureRes(CommonTexturePath + "TotalScore/bg_yellow", this.img_bg);
            this.label_score.node.color = cc.hexToColor("#670409");
        }
        else {
            SetTextureRes(CommonTexturePath + "TotalScore/bg_blue", this.img_bg);
            this.label_score.node.color = cc.hexToColor("#242B3A");
        }
    }
}
