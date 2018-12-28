const {ccclass, property} = cc._decorator;

@ccclass
export default class LHZMJ_CardBase extends cc.Component {

    onLoad() {
        // init logic
        cc.log("--- LHZMJ_CardBase onlod");
    }

    /**
     * 清理
     * */
    public clear():void{
        
    }
}
