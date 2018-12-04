// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabClass extends cc.Component {
   
    @property(cc.Button)
    ExitBtn : cc.Button = null;//玩法界面退出按钮


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    ShowWanfa (){
        if(!this.node.active)
            this.node.active = true;
        else
            this.node.active = false;

    }

    exit () {
        // this.node.active = false;
        var testNode = this.node.getChildByName("Sprite_FJWF");
        var node11 = testNode.parent;
        node11.active = false;
        
        if(testNode.active)
            testNode.active = false;
        else
            testNode.active = true;
    }
    // update (dt) {}   
}
