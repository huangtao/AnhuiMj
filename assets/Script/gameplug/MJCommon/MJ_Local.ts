const {ccclass, property} = cc._decorator;

@ccclass
export default class MJ_Local extends cc.Component {

    @property([cc.Sprite])
    imgshow: cc.Sprite[]=[];


    onLoad() {
        // init logic
        
    }

    private static LoaclPos: Array<{ x: number,y: number }> = [
        { x: 0,y: -160 },
        { x: 300,y: 0 },
        { x: 0,y: 160 },
        { x: -300,y: 0 }
    ];

    public init(): void {
        this.node.active = false;
    }

    public ShowLoacl(selfChair:number,dongWei:number):void{
        //使用local的必然是四人麻将
        let start=(dongWei-selfChair+4)%4;
        for(let i=0;i<4;i++){
            let pos=(start+i)%4;
            this.imgshow[i].node.x=MJ_Local.LoaclPos[pos].x;
            this.imgshow[i].node.y=MJ_Local.LoaclPos[pos].y;
            
            this.imgshow[i].node.rotation=0;
        }
        let rot=90;
        start=(selfChair-dongWei+4)%4;
        for(let i=0;i<4;i++){
            let pos=(start+i)%4;
            rot-=90;
            this.imgshow[pos].node.rotation=rot;
        }
        this.node.active=true;
    }
}
