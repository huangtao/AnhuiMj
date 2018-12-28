import UIBase from "../Base/UIBase";
import { Action } from "../../CustomType/Action";
import CreateRoomDataCache from "../CreateRoom/CreateRoomDataCache";
import GameWanFaItem from "./GameWanFaItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWanFa extends UIBase<any> {
	public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;

    @property(cc.Layout)
	layout: cc.Layout = null;

	@property(cc.Prefab)
	wanfaItemPrefab: cc.Prefab = null;

    @property(cc.Sprite)
    sp_bg: cc.Sprite = null;

    /**
     * 属性列表
     */
    private _itemArray = [];

    public InitShow() {
    	if (!this.ShowParam) {
    		return;
    	}

        this._itemArray = [];

    	let act = new Action(this,this.showRule);
    	CreateRoomDataCache.Instance.getRuleDesc(this.ShowParam.modelName,this.ShowParam.rule,act);
    }

    public showRule(obj: any){
    	if (!obj || !this.layout || !this.wanfaItemPrefab) {
    		return;
    	}

        // this.node.y = 360;
        this.sp_bg.node.height = 360;
        this.layout.node.height = 50;
        this.sp_bg.node.setAnchorPoint(cc.p(0.5,1));
    	this.layout.node.removeAllChildren();
        this.layout.updateLayout();

    	let array = new Array<any>();
    	let keys = Object.keys(obj);
    	/**
         * 排序 
         * 房费和局数排在最前面
         */
        let idx1 = keys.indexOf('房费');
        let idx2 = keys.indexOf('局数');

        if (-1 != idx1 && -1 != idx2) {
            keys.splice(idx1,1);
            keys.splice(idx2,1);
            
            keys = ['局数','房费'].concat(keys);
        }

    	for (let idx = 0; idx < keys.length; ++idx) {
    		let isCreateItem = false;

    		// 进行分组一组两个
    		if (0 != (idx+1) % 2) {
    			array.push({name: keys[idx],value: obj[keys[idx]]});

    			if (idx + 1 >= keys.length) {
    				isCreateItem = true;
    			}
    		}else{
    			array.push({name: keys[idx],value: obj[keys[idx]]});
    			isCreateItem = true;    			
    		}

    		if (isCreateItem) {
    			let prefab = cc.instantiate(this.wanfaItemPrefab);
    			let item: GameWanFaItem = prefab.getComponent(GameWanFaItem);
    			item.createRuleShow(array);
                this._itemArray.push(item);
    			this.layout.node.addChild(prefab);
                               
    			// 清空数组
    			array = [];
    		}
    	}

        // 延迟刷新显示检查是否有属性显示超出了指定长度如果是则另起一行显示
        this.scheduleOnce(()=>{
            this.lateUpdateShow();
        },0.01);
    }
    /**
     * 延迟刷新显示检查是否有属性显示超出了指定长度如果是则另起一行显示
     */ 
    public lateUpdateShow() {
        for (var idx = 0; idx < this._itemArray.length; ++idx) {
            let newLineAttrList = this._itemArray[idx].getNewLineAttrList();
            cc.info("--- newLineAttrList ", newLineAttrList);

            for (var index = 0; index < newLineAttrList.length; ++index) {
                let attrInfo = newLineAttrList[index];

                if (1 == attrInfo.node.parent.childrenCount) {
                    this._itemArray[idx].node.removeFromParent();
                } else {
                    attrInfo.node.removeFromParent();
                }

                let prefab = cc.instantiate(this.wanfaItemPrefab);
                let item: GameWanFaItem = prefab.getComponent(GameWanFaItem);
                item.createRuleShow([attrInfo.attr]);
                this.layout.node.addChild(prefab);
            }
        }

        this.layout.updateLayout();

        this.scheduleOnce(()=>{
            this.autoFormSize();
        },0.01);
    }

    /**
     * 根据玩法个数自适应弹窗大小
     */
    public autoFormSize() {        
        if (this.layout.node.getContentSize().height >= 240) {
            let diffY = this.layout.node.getContentSize().height - 240;
            this.sp_bg.node.height += diffY;
            this.node.y = (this.node.y + diffY / 2);
        }
    }
}
