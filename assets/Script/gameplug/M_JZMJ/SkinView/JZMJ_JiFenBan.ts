import { JZMJMahjongDef, JZMJ } from "../ConstDef/JZMJMahjongDef";
import { M_JZMJ_GameMessage } from "../../../CommonSrc/M_JZMJ_GameMessage";
import JZMJ_SinglePlayerRecord from "./JZMJ_SinglePlayerRecord";
import M_JZMJClass from "../M_JZMJClass";
import JZMJ_HeadPortrait from "./JZMJ_HeadPortrait";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JZMJ_JiFenBan extends cc.Component {
    @property(cc.Button)
    btn_exit:cc.Button=null;
    @property(cc.Button)
    btn_share:cc.Button=null;
    @property(cc.Button)
    btn_close:cc.Button=null;
    // @property([cc.Sprite])
    // img_accountAry:cc.Sprite[];
    // @property([cc.Sprite])
    // img_maskAry:cc.Sprite[];
    @property([cc.Label])
    lbl_accountAry:cc.Label[]=[];
    @property([cc.Label])
    lbl_totalAry:cc.Label[]=[];

    //大赢家标志
    @property([cc.Sprite])
    img_winner: cc.Sprite[]=[];
    /**
     * 日期
     */
    @property(cc.Label)
    lbl_date:cc.Label=null;
    /**
     * 局数
     */
    @property(cc.Label)
    lbl_gamenum:cc.Label=null;
    /**
     * 头像
     */
    @property([cc.Prefab])
    pfb_touXiang:cc.Prefab[]=[];
    private _touxiangAry:Array<JZMJ_HeadPortrait>;



    @property(cc.Prefab)
    pfb_SinglePlayerRecord:cc.Prefab=null;




    /**
     * 滑动容器
     */
    @property(cc.Node)
    node_Container:cc.Node=null;



    public static _freeNode=new cc.NodePool();
    private _zuoBiaoAry:Array<cc.Vec2>;


    //private _group_jifenban:eui.Group;
    
    //
    //======================================================
    //
    //列表滚动
    // protected _scrListRecord: egret.ScrollView;
    // //列表容器
    // protected _recordListContainer: egret.DisplayObjectContainer;
    //记录数据
    private _gameRecordAry:Array<M_JZMJ_GameMessage.GameRecordResult>;
    //是否取过数据
    private _hasReadData:boolean;
    
    private _fun_ok_callback: () => void;
    private _obj_ok_callback: any;
    
    public constructor() {
        super();

        this._gameRecordAry = new Array<M_JZMJ_GameMessage.GameRecordResult>();
        this._hasReadData=false;
    }

    public Init():void{
        this.InitXY();
        this.InitDaFuHao();
        this.InitTouXiang();
    }

    /**
     * 初始化四个头像的坐标
     */
    private InitXY():void{
        this._zuoBiaoAry=new Array<cc.Vec2>();
        var v1:cc.Vec2=new cc.Vec2();
        v1.x=-352;
        v1.y=178;
        
        var v2:cc.Vec2=new cc.Vec2();
        v2.x=-142;
        v2.y=178;

        var v3:cc.Vec2=new cc.Vec2();
        v3.x=74;
        v3.y=178; 
        
        var v4:cc.Vec2=new cc.Vec2();
        v4.x=287;
        v4.y=178;

        this._zuoBiaoAry.push(v1);
        this._zuoBiaoAry.push(v2);
        this._zuoBiaoAry.push(v3);
        this._zuoBiaoAry.push(v4);

        this.InitTouXiang();
    }
    /**
     * 初始化大富豪(即把大富豪图片隐藏起来)
     */
    private InitDaFuHao():void{
        for(var i=0;i<this.img_winner.length;i++){
            this.img_winner[i].node.active=false;
        }
    }
    /**
     * 初始化头像
     */
    private InitTouXiang():void{
        this._touxiangAry=new Array<JZMJ_HeadPortrait>();
        for(var i=0;i<this.pfb_touXiang.length;i++){
            var toux=cc.instantiate(this.pfb_touXiang[i]);
            this._touxiangAry.push(toux.getComponent<JZMJ_HeadPortrait>(JZMJ_HeadPortrait));
            toux.x=this._zuoBiaoAry[i].x;
            toux.y=this._zuoBiaoAry[i].y;
            this.node.addChild(toux);
        }
    }

    onLoad() {
        // init logic
        
    }
		/**
         * ui创建完成
         * */
        protected uiCompHandler(): void {
            this.btn_close.node.on(cc.Node.EventType.MOUSE_UP,(e:cc.Event.EventCustom)=>{
                this.show=false;
            },this);
            this.btn_exit.node.on(cc.Node.EventType.MOUSE_UP,(e:cc.Event.EventCustom)=>{
                this.show=false;
            },this);
            this.btn_share.node.on(cc.Node.EventType.MOUSE_UP,(e: cc.Event.EventCustom) => {
                M_JZMJClass.ins.ScreenCapture(true);
            },this);
            // for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
            //     //this._img_maskAry[i]=new eui.Image("scoreheader_bg_png");
            //     this._img_accountAry[i].mask=this._img_maskAry[i];
            // }
        }
        
        /**
         * 添加一条记录
         * */
        public gameRecord(recordData:Array<number>):void{
            // if(!this._hasReadData){
            //     return;
            // } 
            
            var gameRecord: M_JZMJ_GameMessage.GameRecordResult = new M_JZMJ_GameMessage.GameRecordResult();
            gameRecord.PlayerScore = new Array<number>();
            
            while(recordData.length > 0){
                gameRecord.PlayerScore.push(recordData.shift());
            }
            
            this._gameRecordAry.push(gameRecord);
        }
        
        /**
         * 游戏记录数据到来
         * */
        public gameRecordDataCome(recordData: Array<M_JZMJ_GameMessage.GameRecordResult>):void{
            this._hasReadData=true;
            if(recordData.length>0)
            {
                this._gameRecordAry.length=0;
                //this._recordListContainer.removeChildren();
                this.node_Container.removeAllChildren();
            }
            // while(this._recordListContainer.numChildren > 0){
            //     this._recordListContainer.removeChildAt(0);
            // }
            for(let i=0;i<recordData.length;i++)
            {
                this._gameRecordAry.push(recordData[i]);
            }
            // while(recordData.length > 0){
            //     this._gameRecordAry.push(recordData.shift());
            // }
            this.loadRecordData();
        }
        
        /**
         * 开始显示
         * */
        public startShow(fun: () => void = null,obj: any = null):void{
            this._fun_ok_callback = fun;
            this._obj_ok_callback = obj;

            this.show=true;
        }
        
        /**
         * 设置玩家账号
         * */
        public setPlayeAccount(chair:number,account:string):void{
            this.lbl_accountAry[chair].string = account;
        }
        
        /**
         * 显示
         * */
        protected onShow(): void {
            let time=new Date();
            let strTime = time.getFullYear() + "/" + this.FomatNumber(time.getMonth() + 1) + "/" + this.FomatNumber(time.getDate());
            strTime += " " + this.FomatNumber(time.getHours()) + ":" + this.FomatNumber(time.getMinutes());
            this.lbl_date.string = strTime;
            this.lbl_gamenum.string="局号："+JZMJ.ins.iclass.getTableConfig().TableCode;
            for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){


                //this._img_accountAry[i].source=JZMJ.ins.iclass.getTablePlayerAry()[i].FaceID;

                this._touxiangAry[i].setHeadPortSpri(JZMJ.ins.iclass.getTablePlayerAry()[i].FaceID);

                let name:string=JZMJ.ins.iclass.getTablePlayerAry()[i].NickName;
                if (name.length > 4){
                    this.lbl_accountAry[i].string = name.substring(0, 4);
                }
                else{
                    this.lbl_accountAry[i].string = name;
                }
                if (i==JZMJ.ins.iclass.getSelfChair()) {
                    this.lbl_accountAry[i].node.color =new cc.Color(0xff,0x5c,0x00);
                }
                else {
                    this.lbl_accountAry[i].node.color = new cc.Color(0x5B,0x1E,0x00);
                }
                this.lbl_totalAry[i].string="0";
            }
            
            //if(!this._hasReadData){
            var queryRecord :M_JZMJ_GameMessage.CMD_C_QueryGameRecord = new M_JZMJ_GameMessage.CMD_C_QueryGameRecord();
            queryRecord.queryNum = 0;
            JZMJ.ins.iclass.sendData(queryRecord);
            this.loadRecordData();
            // }else{
            //     this.loadRecordData();
            // }
        }
        
        /**
         * 显示数据列表
         * */
        private loadRecordData():void{
            
            var totalScore:Array<number> = new Array<number>();
            totalScore.push(0);
            totalScore.push(0);
            totalScore.push(0);
            totalScore.push(0);
            let winmax=0;//最大赢
            for(var i: number = 0;i < this._gameRecordAry.length;i++) {
                // var record: JZMJ_SinglePlayerRecord = new JZMJ_SinglePlayerRecord(this._gameRecordAry[i],i);
                // this._recordListContainer.addChild(record);
                // record.node.y = i * 61;
            //       let newnode = JZMJ_JiFenBan._freeNode.get();
            // if (!cc.isValid(newnode)) {
            //     newnode = cc.instantiate(this.single);
            // }
            //   let sin=newnode.getComponent<JZMJ_SinglePlayerRecord>(JZMJ_SinglePlayerRecord);
            // sin.init(this._gameRecordAry[i],i);
            // newnode.x=0;
            // newnode.y=-30.5-61*i;
            // //var record: WHMJ_SinglePlayerRecord = new WHMJ_SinglePlayerRecord(this._gameRecordAry[i],i);
            // this.group.addChild(newnode);
                this.AddDataToContain(this._gameRecordAry[i],i);
                
                for(var j:number=0; j<JZMJMahjongDef.gPlayerNum; j++){
                    totalScore[j] += this._gameRecordAry[i].PlayerScore[j];
                }
            }
            
            for(var m:number=0; m<JZMJMahjongDef.gPlayerNum; m++){
                
                if(totalScore[m] > 0) {
                    this.lbl_totalAry[m].string = "+" + totalScore[m].toString();
                    this.lbl_totalAry[m].node.color =new cc.Color(0x2b,0x8a,0x18);
                } else {
                    this.lbl_totalAry[m].string = totalScore[m].toString();
                    this.lbl_totalAry[m].node.color =new cc.Color(0xda,0x19,0x01);
                }
                this.img_winner[m].node.opacity=0;
                if(totalScore[m]>winmax)
                {
                    winmax=totalScore[m];
                }
            }
            // if(winmax>0) 大富豪不显示
            // {
            //     for(var i:number=0; i<JZMJMahjongDef.gPlayerNum; i++){
            //         if(totalScore[i]==winmax)
            //         {
            //             this._img_winner[i].visible=true;
            //         }
            //     }
            // }
        }

        private AddDataToContain(data:M_JZMJ_GameMessage.GameRecordResult,i:number){
         //   var dt=cc.instantiate(this.pfb_SinglePlayerRecord);
                 let newnode = JZMJ_JiFenBan._freeNode.get();
            if (!cc.isValid(newnode)) {
                newnode = cc.instantiate(this.pfb_SinglePlayerRecord);
            }

             let sin=newnode.getComponent<JZMJ_SinglePlayerRecord>(JZMJ_SinglePlayerRecord);
          //  sin.init(this._gameRecordAry[i],i);
            // newnode.x=0;
            // newnode.y=-30.5-61*i;
            
            newnode.y=i*61;
            var xx:JZMJ_SinglePlayerRecord=newnode.getComponent<JZMJ_SinglePlayerRecord>(JZMJ_SinglePlayerRecord);
            xx.Init(data,i);
            this.node_Container.addChild(newnode);
        }




        /**
         * 转化数字格式
         */
        private FomatNumber(value: number): string {
            var result = "";
            if (value < 10)
                return "0" + value;
            else
                return "" + value;
        }
        /**
         * 新的游戏回合开始
         * */
        public gameroundStart(){
            this._hasReadData=false;
            this._gameRecordAry.splice(0,this._gameRecordAry.length);
            
            // while(this._recordListContainer.numChildren > 0){
            //     this._recordListContainer.removeChildAt(0);
            // }
            
            this.node_Container.removeAllChildren();
        }


        /**
         * 显示
         */
        public set show(isShow: boolean) {
            this.node.active = isShow;
            if(isShow){
                this.onShow();
            }else{
                //this.onHide();
            }
        }
        


	}

