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
    //详情
    @property (cc.Node)
    private node_Info:cc.Node = null;

    //包赔
    @property(cc.Sprite)
    private sprite_baopei:cc.Sprite = null;

    private _index:number = null;

    onLoad () {
        this.sprite_baopei.node.active = false;
        this.node_Info.on(cc.Node.EventType.TOUCH_START,this.showInfoView,this);
        this.Label_score_add.node.active = false;
        this.Label_score_left.node.active = false;
    }
    public show(_index:number,faceID: string, name: string,data:number,roundScoreStr:string,isBaoPei:boolean){
        this._index = _index;
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

    }
    private showInfoView(){
        let event = new cc.Event.EventCustom('showInfo', true);
        event.setUserData([this._index]);
        this.node.dispatchEvent(event);
    //   if( this.node_View.active ){
    //    this.node_View.active = false;
     //  }else{
     //   this.node_View.active = true;
     //  }
    }

}
