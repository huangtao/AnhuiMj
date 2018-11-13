const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ_ChatContext extends cc.Component {

    @property(cc.Label)
    label: cc.Label=null;


    @property(cc.Sprite)
    img_bg: cc.Sprite=null;

    //聊天内容
    private _chatAry: Array<string>;

    onLoad() {
        // init logic
        //this.init()
    }
    /**
     * 初始化方向
     * */
    public init(): void {
        this._chatAry = new Array<string>();
        this.node.active = false;
        this.node.stopAllActions();
        this.node.opacity = 0;
        cc.log("===========================刷新init:MJ_ChatContext:" + this._chatAry.length);
    }

    public ShowChat(chat: string): void {
        this._chatAry.push(chat);

        if (!this.node.active) {
            this.node.active = true;
        } else if (this.node.opacity == 0) {
            this.ShowAll();
        }
    }

    // /**
    //  * 显示聊天框
    //  */
    // public ShowChat(value: string) {
    //     this.unschedule(this.AniOver);
    //     this.node.active = true;
    //     //this.label_chat.string = value;
    //     let str="";
    //     let s=value;//this._chatAry.shift();
    //     if(s.length>7)
    //     {
    //         str=s.substr(0,(s.length+1)/2);
    //         str+="\n";
    //         str+=s.substr((s.length+1)/2+1);
    //     }else{
    //         str=s;
    //     }
    //     this.label.string = str;
    //     this.scheduleOnce(this.AniOver, 3.5);
    // }
    // private AniOver() {
    //     this.node.active = false;
    // }

    onEnable(): void {
        this.ShowAll();
    }

    onDisable(): void { 
        this._chatAry.length = 0;
        this.node.stopAllActions();
        this.node.opacity = 0;
    }
    /**
     * 显示
     * */
    private ShowAll(): void {
        if (this._chatAry == null) {
            this._chatAry = new Array<string>();
        }
        if (this._chatAry.length == 0) {
            cc.log("jieshu");
            return;
        }

        this.node.opacity = 1;
        this.node.active = true;
        let str = "";
        let s = this._chatAry.shift();
        if (s.length > 7) {
            str = s.substr(0, (s.length + 1) / 2);
            str += "\n";
            str += s.substr((s.length + 1) / 2);
        } else {
            str = s;
        }
        this.label.string = str;
        let callAction = cc.callFunc(this.ShowAll, this);
        let action = cc.sequence(cc.fadeTo(0.2, 250), cc.fadeTo(2.2, 255), cc.fadeTo(1, 0), callAction);

        this.node.runAction(action);
    }
    /**
     * 清除
     * */
    public Clear(): void {
        this._chatAry.length = 0;
        this.node.stopAllActions();
        this.node.opacity = 0;
        this.node.active = false;
    }
}
