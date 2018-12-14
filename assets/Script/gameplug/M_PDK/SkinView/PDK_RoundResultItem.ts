import { LoadHeader } from "../../../Tools/Function";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PDK_RoundResultItem extends cc.Component {

    //昵称
    @property(cc.Label)
    private Label_name:cc.Label = null;
    //分数
    @property(cc.Label)
    private Label_score_add:cc.Label = null;
    //分数
    @property(cc.Label)
    private Label_score_left:cc.Label = null;
    //包赔
    @property(cc.Sprite)
    private sprite_baopei:cc.Sprite = null;
    //头像
    @property(cc.Sprite)
    private sprite_head:cc.Sprite = null;
    //详细描述
    @property(cc.RichText)
    private RichText_info:cc.RichText = null;

    onLoad () {
        this.sprite_baopei.node.active = false;
        this.Label_score_add.node.active = false;
        this.Label_score_left.node.active = false;
    }
    public show(_index:number,faceID: string, name: string,data:number,roundScoreStr:string,isBaoPei:boolean,dataStr:string){
        this.sprite_head.spriteFrame = null;
        LoadHeader(faceID, this.sprite_head);
        this.sprite_head.node.width = 68;
        this.sprite_head.node.height = 68;

        if( name.length > 5){
            name = name.substring(0,5) + "...";            
        }
        this.Label_name.string = name;

        if(data > 0){
            this.Label_score_add.string = "+" + data;
            this.Label_score_add.node.active = true;
            this.Label_score_left.node.active = false;
        }else{
            this.Label_score_add.node.active = false;
            this.Label_score_left.string = data.toString();
            this.Label_score_left.node.active = true;
        }
        if(isBaoPei){
            this.sprite_baopei.node.active = true;
        }else{
            this.sprite_baopei.node.active = false;
        }
        this.RichText_info.string = dataStr;

    }

}
