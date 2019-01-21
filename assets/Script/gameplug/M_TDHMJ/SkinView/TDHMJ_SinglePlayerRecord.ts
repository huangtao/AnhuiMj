import { M_TDHMJ_GameMessage } from "../../../CommonSrc/M_TDHMJ_GameMessage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TDHMJ_SinglePlayerRecord extends cc.Component {

    @property(cc.Label)
    lbl_idx:cc.Label=null;
    @property(cc.Label)
    lbl_score_0:cc.Label=null;
    @property(cc.Label)
    lbl_score_1:cc.Label=null;
    @property(cc.Label)
    lbl_score_2:cc.Label=null;
    @property(cc.Label)
    lbl_score_3:cc.Label=null;


    private _lbl_recordAry:Array<cc.Label>;

    private _img_bg:cc.Sprite;
    
    //股票数据
    private _data: M_TDHMJ_GameMessage.GameRecordResult;
    //索引
    private _idx:number;


    public constructor(){
        super();
    }

    onLoad() {
        // init logic
        
        this._img_bg=this.node.getComponent<cc.Sprite>(cc.Sprite);
        this.initlblAry();

        this.ShowScore();
    }
    /**
     * 初始化
     * @param data 
     * @param idx 
     */
    public Init(data: M_TDHMJ_GameMessage.GameRecordResult,idx:number):void{
        this._data=data;
        this._idx=idx;
    }
    

    private initlblAry():void{
        this._lbl_recordAry=new Array<cc.Label>();

        for(var i=0;i<4;i++){
            this._lbl_recordAry.push(this.node.getChildByName(`lbl_score_${i}`).getComponent<cc.Label>(cc.Label));
        }
    }
    /**
     * 设置背景图片
     * @param index 索引
     */
    private SetImageBg(index:number):void{

        if(index%2==0){
            this._img_bg.spriteFrame=new cc.SpriteFrame("gameres/gameCommonRes/Texture/Mahjong/MJ_JiFenBan/mj_jfb_line_qian_1280.png");
        }
        else{
            this._img_bg.spriteFrame=new cc.SpriteFrame("gameres/gameCommonRes/Texture/Mahjong/MJ_JiFenBan/mj_jfb_line_shen_1280.png");
        }
    }

    public ShowScore():void{
        this.lbl_idx.string=`${this._idx + 1}`;//+temp;

        this.SetImageBg(this._idx);
        
        for(var j:number=0; j<this._lbl_recordAry.length; j++){
            if(this._data.PlayerScore[j] > 0){
                this._lbl_recordAry[j].string = "+" + this._data.PlayerScore[j].toString();
                this._lbl_recordAry[j].node.color=new cc.Color(0x2b,0x8a,0x18,0xff);
            }else{
                this._lbl_recordAry[j].string = this._data.PlayerScore[j].toString();
                this._lbl_recordAry[j].node.color =new cc.Color(0xda,0x19,0x01,0xff);
            }
            if(this._data.Banker==j)
            {
                //this._lbl_recordAry[j].bold=true;
            }
        }
    }









}
