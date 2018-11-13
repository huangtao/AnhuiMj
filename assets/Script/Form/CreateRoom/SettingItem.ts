/**
 * 规则面板横条Item
 */
import { ToggleType } from "./CreateRoomEnum";
import CheckBoxToggle from "./RuleItemType/CheckBoxToggle";
import RuleItemPool from "./RuleItemType/RuleItemPool";
import RuleItemToggleBase from "./RuleItemType/RuleItemToggleBase";
import Dictionary from '../../CustomType/Dictionary';
import { Action } from "../../CustomType/Action";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingItem extends cc.Component {
	/**
	 * 属性名称Icon
	 */
    @property(cc.Sprite)
    sp_attrIcon: cc.Sprite = null;

    /**
	 * 选项容器
	 */
    @property(cc.Layout)
    layout_item: cc.Layout = null;

    /**
     * 选项框点击回调
     */
    public action: Action = null;
    /**
     * 父节点
     */
    private _parentNode: cc.Node = null;

    /**
     * 节点数组
     */
    private _itemNodeArray: Dictionary<string,cc.Node>;

    public get ItemNodeArray() : Dictionary<string,cc.Node>{
        if (!this._itemNodeArray) {
            this._itemNodeArray = new Dictionary<string,cc.Node>();
        }

        return this._itemNodeArray;
    }

    public onLoad() {
    }
    
    public createItemList(data: any,parent: cc.Node): void{
    	this._parentNode = parent;
        this.layout_item.node.removeAllChildren();
    	// 属性图标
    	if (cc.isValid(this.sp_attrIcon)) {
    		let sp_icon:cc.Sprite = this.sp_attrIcon.getComponent(cc.Sprite);
            cc.loader.loadRes("createRoom/" + data.attrIcon,(err,res)=>{
                if (err) {
                    cc.info(err);
                    return;
                }

                let frame = new cc.SpriteFrame(res);

                if (cc.isValid(frame)) {
                    sp_icon.spriteFrame = frame;
                }
            });
    	}

    	// 创建规则选项
    	let itemInfo: any = null;
    	for (let idx = 0; idx < data.itemList.length; ++idx) {
            // 配置不可用的项不创建
            if (!data['enabled']) {
                continue;
            }

    		itemInfo = data.itemList[idx];
    		this.createToggle(itemInfo);
    	}
    }

    /**
     * 创建选项框
     */
    private createToggle(info: any): cc.Node{
    	let node: cc.Node = null;

    	switch (info.nodeType) {
    			case ToggleType.TOGGLE_CHECKBOX:
    				this.createCheckBox(info);
    				break;
    			case ToggleType.TOGGLE_SINGLE:
                    this.createSingleToggle(info);
    				break;
    			case ToggleType.TOGGLE_CHECKBOX:
    				break;
    			case ToggleType.TOGGLE_SLIDER:
    				break;
    			case ToggleType.TOGGLE_DROPDOWN:
    				break;
    			case ToggleType.TOGGLE_SINGLE_DROPDOWN:
    				break;
    			case ToggleType.TOGGLE_CHECKBOX_DROPDOWN:
    				break;
                case ToggleType.SINGLE_LEFTRIGHT:
                case ToggleType.CHECKBOX_LEFTRIGHT:
                    this.createLeftRightToggle(info);
                    break;
    			default:
    				cc.info("error: not exist ToggleType ",info.nodeType);
    				break;
    	}
    		
    	return node;
    }

    /**
     * 创建复选框
     */
    public createCheckBox(data: any): void{
    	if (0 == data.list.length) {
    		return;
    	}

    	let node: cc.Node = null
    	for (let idx = 0; idx < data.list.length; ++idx) {
    		let prefab = RuleItemPool.Instance.getGameRuleItemPrefab("CheckBoxToggle");
    		let item = data.list[idx];

            // 配置不可用的项不创建
            if (!item['enabled']) {
                continue;
            }

            node = cc.instantiate(prefab);
            let componet: RuleItemToggleBase = node.getComponent(CheckBoxToggle);
            componet.ClickCallBack = this.action;
            componet.showData = item;
            componet.initShow();
            RuleItemPool.Instance.putGameRuleItemPrefab("CheckBoxToggle",prefab);
            this.ItemNodeArray.AddOrUpdate(item.attr + ':' + item.value,node);

            this.layout_item.node.addChild(node);
            this.layout_item.updateLayout();
    	}
    }

    /**
     * 创建单选选框
     */
    public createSingleToggle(data: any): void{
    	if (0 == data.list.length) {
            return;
        }

        // 先创建一个ToggleTainer在创建Toggle
        let createToggleContainer = (callback: Function)=>{
            let cb = callback;
            let container = null;
            container = RuleItemPool.Instance.getGameRuleItemPrefab("QLToggleContainer");
    
            if (container) {
                return cb(container);
            }
        }

        // 创建单选按钮
        let createToggle = (container: cc.Prefab)=>{
            let toggleContainer = cc.instantiate(container);
            this.layout_item.node.addChild(toggleContainer);
            this.layout_item.updateLayout();

            let node: cc.Node = null
            let qlContainer = toggleContainer.getComponent("QLToggleContainer");
    
             if (qlContainer) {
                 if (!qlContainer.action) {
                     qlContainer.action = this.action;
                 }
             }

            for (let idx = 0; idx < data.list.length; ++idx) {
                let prefab = RuleItemPool.Instance.getGameRuleItemPrefab("SingleToggle");
                let item = data.list[idx];

                // 配置不可用的项不创建
                if (!item['enabled']) {
                    continue;
                }

                node = cc.instantiate(prefab);

                if (qlContainer) {
                    this.ItemNodeArray.AddOrUpdate(item.attr + ':' + item.value,node);
                    qlContainer.addToggle(node);
                    this.layout_item.updateLayout();
                }

                let componet: RuleItemToggleBase = node.getComponent("SingleToggle");
                componet.showData = item;
                componet.initShow();
            }
        };

        createToggleContainer(createToggle);
    }

    /**
     * 创建单选或复选框带左右箭头选择框按钮
     */
    public createLeftRightToggle(data: any): void{
        if (0 == data.list.length) {
            return;
        }

        // 配置不可用的项不创建
        if (!data['enabled']) {
            return;
        }

        let typeName = "";

        if (ToggleType.SINGLE_LEFTRIGHT == data.nodeType) {
            typeName = "SingleLeftRight";
        }else if (ToggleType.CHECKBOX_LEFTRIGHT == data.nodeType) {
            typeName = "CheckBoxLeftRight";
        }

        let prefab = RuleItemPool.Instance.getGameRuleItemPrefab(typeName);

        if (prefab) {
            let node = cc.instantiate(prefab);
            let componet: RuleItemToggleBase = node.getComponent(typeName);
            componet.Type = data.nodeType;
            componet.ClickCallBack = this.action;
            componet.showData = data;
            componet.initShow();
            this.ItemNodeArray.AddOrUpdate(data.attr + ':' + data.defaultValue,node);
            this.layout_item.node.addChild(node);
            this.layout_item.updateLayout();
        }
    }
}
