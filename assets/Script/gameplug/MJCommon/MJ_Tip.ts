const {ccclass, property} = cc._decorator;

@ccclass
export default class MJ_Tip extends cc.Component {

    @property(cc.Sprite)
    img_bg: cc.Sprite=null;

    @property(cc.Label)
    neirong: cc.Label=null;

    @property(cc.Node)
    weizhi: cc.Node=null;

    //聊天内容
    private _show:string;

    onLoad() {
        // init logic
        //this.init()
        // this.node.active=false;
    }
    /**
     * 初始化方向
     * */

    public startShow(neirong:string,x:number,y:number,wid:number,hei:number):void{
        // this.neirong.active=true;
        this.neirong.string=neirong;

        this.weizhi.x=x;
        this.weizhi.y=y;

        this.img_bg.node.width=wid;
        this.img_bg.node.height=hei;

        this.neirong.node.width=wid-40;

        this.node.active=true;
    }

    public clearShow():void{
        this.node.active=false;
    }

}
