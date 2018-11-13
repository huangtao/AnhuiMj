const {ccclass, property} = cc._decorator;

@ccclass
export default class MJ_PlayVoiceStaus extends cc.Component {

    @property([cc.Node])
    img_staus: cc.Node[]=[];

    private _idx: number;
    private _intervalIdx: number;

    onLoad() {
        // init logic
    }

    public startPlay():void{
        // egret.clearInterval(this._intervalIdx);
        this.node.active=true;
        this._idx = 1;
        for(var i: number = 0;i < this.img_staus.length;i++) {
            this.img_staus[i].active = i < this._idx;
        }
        //this._intervalIdx = egret.setInterval(this.onInterval,this,300);
        this.schedule(this.onInterval, 0.3);
        
    }
    
    public stopPlay():void{
        this.unschedule(this.onInterval);
        this.node.active=false;
    }

    /**  
     * 循环调用
     * */
    private onInterval(): void {
        ++this._idx;
        if(this._idx > 4) {
            this._idx = 1;
        }
        for(var i: number = 0;i < this.img_staus.length;i++) {
            this.img_staus[i].active = i < this._idx;
        }
    }
}
