

const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ_UserGamingScore extends cc.Component {

    @property(cc.Label)
    lbl_moneyNum: cc.Label=null;

    private score:number;

    onLoad() {
        // init logic
        
    }

    public init():void{
        this.node.active=false;
        this.score=0;
    }

    public addUserScore(moneyNum:number,value:boolean):void{
        this.score+=moneyNum;
        this.showit(value);
    }

    public showUserScore(moneyNum:number,value:boolean):void{
        this.score=moneyNum;
        this.showit(value);
    }

    private showit(value:boolean):void{//数字超过5位，用万标识
        if(this.score > 0){
            //this.lbl_moneyNum.node.color=0xFED957;//0x2b8a18;
            if(this.score>=100000)
            {
                this.lbl_moneyNum.string = "+" + (this.score/10000).toFixed(0).toString()+"万";
            }
            else
            {
                this.lbl_moneyNum.string = this.score.toString();
            }
        }else{
            //this.lbl_moneyNum.textColor = 0xFED957;//0xda1901;
            if(this.score<=-100000)
            {
                this.lbl_moneyNum.string = (this.score/10000).toFixed(0).toString()+"万";
            }
            else
            {
                this.lbl_moneyNum.string = this.score.toString();
            }
        }
        if(value)
        {this.node.active=true;}    
        else
        {this.node.active=false;}
    }

    public Clear():void{
        this.node.active=false;
        this.score=0;
    }
}
