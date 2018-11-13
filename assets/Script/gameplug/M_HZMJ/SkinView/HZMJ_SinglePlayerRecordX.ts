import { M_HZMJ_GameMessage } from "../../../CommonSrc/M_HZMJ_GameMessage";
import { SetTextureRes } from "../../MJCommon/MJ_Function";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HZMJ_SinglePlayerRecordX extends cc.Component {

    @property(cc.Sprite)
    img_bg: cc.Sprite=null;
    @property([cc.Label])
    lbl_recordAry: cc.Label[]=[];
    @property(cc.Label)
    lbl_idx: cc.Label=null;

    //数据
    private _data: M_HZMJ_GameMessage.GameRecordResult;
    //索引
    private _idx:number;

    onLoad() {
        // init logic
        
    }

    public init(data: M_HZMJ_GameMessage.GameRecordResult,idx:number) {
        this._data = data;
        this._idx = idx;
        this.setData();
    }

    //ui创建完成
    private setData(): void {

        this.lbl_idx.string=`${this._idx + 1}`;//+temp;
        
        this._idx = this._idx % 2;
        if(this._idx==0){
            SetTextureRes(`gameres/gameCommonRes/Texture/Mahjong/MJ_JiFenBan/mj_tiao2`,this.img_bg);
        }
        else{
            SetTextureRes(`gameres/gameCommonRes/Texture/Mahjong/MJ_JiFenBan/mj_tiao1`,this.img_bg);
        }
        
        
        
        for(var j:number=0; j<this.lbl_recordAry.length; j++){
            if(this._data.PlayerScore[j] > 0){
                this.lbl_recordAry[j].string = "+" + this._data.PlayerScore[j].toString();
                this.lbl_recordAry[j].node.color=cc.hexToColor("#2b8a18");
            }else{
                this.lbl_recordAry[j].string = this._data.PlayerScore[j].toString();
                this.lbl_recordAry[j].node.color=cc.hexToColor("#da1901");
            }
        }
        this.node.active=true;
    }
}
