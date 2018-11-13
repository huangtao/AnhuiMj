import UIBase from "../Base/UIBase";
import GameWanfaDescItem from "./GameWanfaDescItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWanFaItem extends cc.Component {
	/**
	 * 玩法描述预制体
	 */
	@property(cc.Prefab)
	descPrefab: cc.Prefab = null;

	@property(cc.Layout)
	layout: cc.Layout = null;

    /**
     * 属性节点集合
     */
    private _itemArray = [];
	/**
	 * 显示玩法字段 (一行只显示三个)
	 */
    public createRuleShow(rule: any): any {
    	if (!rule) {
    		return;
    	}
    	
        // 是否存在长度过长需要另起一行显示的属性(例：玩法)
        let newLineAttr = [];

    	for (var idx = 0; idx < rule.length; ++idx) {
    		let descItem = cc.instantiate(this.descPrefab);
    		let compoment = descItem.getComponent(GameWanfaDescItem)
    		compoment.initShow(rule[idx]);
            this._itemArray.push(compoment);

            this.layout.node.addChild(descItem);
            this.layout.updateLayout();

            if (compoment.isNewLine()) {
                newLineAttr = rule[idx];
                newLineAttr.push(rule[idx]);
                continue;
            }
    	}

        return newLineAttr;
    }

    /**
     * 获取需要创建新行显示的属性数组
     */
    public getNewLineAttrList(): any {
        let tempList = [];
        let item = null;
        for (var idx = 0; idx < this._itemArray.length; ++idx) {
            item = this._itemArray[idx];
            if (item.isNewLine && item.isNewLine()) {
                tempList.push({attr: item.getAttrInfo(),node: item.node});
            }
        }

        return tempList;
    }
}
