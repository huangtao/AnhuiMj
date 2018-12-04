const {ccclass, property} = cc._decorator;

@ccclass
export default class JZMJ_MsgBox extends cc.Component {

    @property(cc.Label)
    lbl_msg:cc.Label=null;

    @property(cc.Button)
    btn_close:cc.Button=null;
    @property(cc.Button)
    btn_1:cc.Button=null;
    @property(cc.Button)
    btn_2:cc.Button=null;

    
    
    private _fun1:()=>void;
    private _obj1:any;
    
    private _fun2:()=>void;
    private _obj2:any;
    
    private _fun_close:()=>void;
    private _obj_close:any;
    	
        
    onLoad() {
        // init logic
        this.btn_close.node.active = false;
        // this.btn_close.node.on(cc.Node.EventType.TOUCH_END,(e:cc.Event.EventCustom)=>{
        //     this.node.active=false;
        //     if((null != this._fun_close) && (null != this._obj_close)) {
        //         this._fun_close.call(this._obj_close);
        //     }
        // },this);
        // this.btn_1.node.on(cc.Node.EventType.TOUCH_END,(e:cc.Event.EventCustom)=>{
        //     this.node.active=false;
        //     if((null != this._fun_close) && (null != this._obj_close)) {
        //         this._fun_close.call(this._obj_close);
        //     }
        // },this);
        // this.btn_2.node.on(cc.Node.EventType.TOUCH_END,(e:cc.Event.EventCustom) => {
        //     this.node.active = false;
        //     if((null != this._fun2) && (null != this._obj2)) {
        //         this._fun2.call(this._obj2);
        //     }
        // },this);
        this.node.setLocalZOrder(999);
    }

    public Init():void{
        
        

        this.node.active=false;
    }


    private hideBox(){
        this.node.active = false;
    }

    public showMsgBox(msg: string,lbl1: string = "",fun1: () => void = null,obj1: any = null,lbl2: string = "",fun2: () => void = null,obj2: any = null,fun_close: () => void = null,obj_close: any = null):void{
        this.node.active=true;
        
        this.lbl_msg.string = msg;
        
        if(("" == lbl1) && ("" == lbl2)){
            lbl1="确定";
        }
        
        this._fun1 = fun1;
        this._obj1 = obj1;
        
        this._fun2 = fun2;
        this._obj2 = obj2;
        
        this._fun_close=fun_close;
        this._obj_close =obj_close;
        
        
        this.btn_1.node.active=lbl1.length > 0;
        
        
        this.btn_2.node.active=lbl2.length > 0;
        
        if(this.btn_1.node.active && this.btn_2.node.active){
             this.btn_1.node.x=160;
             this.btn_2.node.x = -160;
        }
        
        else if(this.btn_1.node.active){
            this.btn_1.node.x = 0;
        }
        else{
            this.btn_2.node.x = 0;
        }
        
    }



}
