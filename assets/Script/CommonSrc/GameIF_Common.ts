import { UyiObject } from "../Serializer/UyiObject";
import { SerializerCreator } from "../Serializer/SerializerCreator";
import { TSRH } from "../Serializer/TypeSerializerRegisterHandle";
import {QL_Common} from "./QL_Common";
export module GameIF_Common {
    /**
     *
     * 创建时间：2018年11月09日 17:32:55
     * 创建人员：DESKTOP-U2RLB94\Cyq
     * 备注：选项类型
     *
     */
    export enum RadioType{
        /**
        * 复选框
        */
        MultipleRadio = 1,
        /**
        * 单选
        */
        SingleRadio = 2,    
    }


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：
     *
     */
    export class Base extends UyiObject {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.Base"; 
        }
       /**
        *规则id
        */
       public ID : number = 0;
   
    }
    SerializerCreator.Register("GameIF.Common.Base", function () {return new Base()})
    TSRH.RSerializer("GameIF.Common.Base", "4|ID", "GameIF.Common.Base");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：
     *
     */
    export class MarkBase extends Base {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.MarkBase"; 
        }
       /**
        *分组描述文本
        */
       public Text : string = "";
       /**
        *规则备注
        */
       public Mark : string = "";
   
    }
    SerializerCreator.Register("GameIF.Common.MarkBase", function () {return new MarkBase()})
    TSRH.RSerializer("GameIF.Common.MarkBase", "4|ID&12|Mark&12|Text", "GameIF.Common.MarkBase");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：用于标记一个选项
     *
     */
    export class GroupItem extends Base {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.GroupItem"; 
        }
       /**
        *选项所在分组
        */
       public Group: number = 0;
   
    }
    SerializerCreator.Register("GameIF.Common.GroupItem", function () {return new GroupItem()})
    TSRH.RSerializer("GameIF.Common.GroupItem", "4|ID&4|Group", "GameIF.Common.GroupItem");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：游戏规则项
     *
     */
    export class GameRuleItem extends MarkBase {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.GameRuleItem"; 
        }
       /**
        *默认选中状态
        */
       public DefaultStatus : boolean = false;
   
    }
    SerializerCreator.Register("GameIF.Common.GameRuleItem", function () {return new GameRuleItem()})
    TSRH.RSerializer("GameIF.Common.GameRuleItem", "4|ID&14|DefaultStatus&12|Mark&12|Text", "GameIF.Common.GameRuleItem");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：游戏私有规则分组
     *
     */
    export class GameRuleGroup extends MarkBase {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.GameRuleGroup"; 
        }
       /**
        *关联父节点
        */
       public Root: GroupItem = null;
       /**
        *分组类型，单选还是多选
        */
       public radio: RadioType = 0;
       /**
        *此分组下包括的所有选项
        */
       public GameRuleSet : GameRuleItem[] = null;
   
    }
    SerializerCreator.Register("GameIF.Common.GameRuleGroup", function () {return new GameRuleGroup()})
    TSRH.RSerializer("GameIF.Common.GameRuleGroup", "4|ID&!GameIF.Common.GameRuleItem|GameRuleSet&1|radio&GameIF.Common.GroupItem|Root&12|Mark&12|Text", "GameIF.Common.GameRuleGroup");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：一条局数与消费
     *
     */
    export class GameCostItem extends MarkBase {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.GameCostItem"; 
        }
       /**
        *币种类型
        */
       public CurrencyType : QL_Common.CurrencyType = 0;
       /**
        *币种数量
        */
       public CurrencyNum : number = 0;
   
    }
    SerializerCreator.Register("GameIF.Common.GameCostItem", function () {return new GameCostItem()})
    TSRH.RSerializer("GameIF.Common.GameCostItem", "4|ID&4|CurrencyNum&1|CurrencyType&12|Mark&12|Text", "GameIF.Common.GameCostItem");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：游戏局数与消费相关
     *
     */
    export class GameCostGroup extends MarkBase {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.GameCostGroup"; 
        }
       /**
        *关联父节点
        */
       public Root: GroupItem = null;
       /**
        *游戏房费可选项
        */
       public GameCostSet : GameCostItem[] = null;
   
    }
    SerializerCreator.Register("GameIF.Common.GameCostGroup", function () {return new GameCostGroup()})
    TSRH.RSerializer("GameIF.Common.GameCostGroup", "4|ID&!GameIF.Common.GameCostItem|GameCostSet&GameIF.Common.GroupItem|Root&12|Mark&12|Text", "GameIF.Common.GameCostGroup");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：游戏规则总表
     *
     */
    export class GameRuleEntity extends UyiObject {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.GameRuleEntity"; 
        }
       /**
        *房费情况
        */
       public RoomCostData : GameCostGroup[] = null;
       /**
        *游戏私有规则表
        */
       public GameData : GameRuleGroup[] = null;
       /**
        *面板上使用的注释信息
        */
       public Mark : string = "";
   
    }
    SerializerCreator.Register("GameIF.Common.GameRuleEntity", function () {return new GameRuleEntity()})
    TSRH.RSerializer("GameIF.Common.GameRuleEntity", "!GameIF.Common.GameRuleGroup|GameData&12|Mark&!GameIF.Common.GameCostGroup|RoomCostData", "GameIF.Common.GameRuleEntity");


    /**
     *
     * @创建时间：2018年11月09日 17:32:55
     * @创建人员：DESKTOP-U2RLB94\Cyq
     * @备注信息：场地特殊属性
     *
     */
    export class GRSpareAttrib extends UyiObject {
        public constructor()
        {
            super();
            this.$T="GameIF.Common.GRSpareAttrib"; 
        }
       /**
        *场地特殊信息1
        */
       public Attribute1: string = "";
       /**
        *场地特殊信息2
        */
       public Attribute2: string = "";
       /**
        *场地特殊信息3
        */
       public Attribute3: string = "";
       /**
        *场地特殊信息4
        */
       public Attribute4: string = "";
       /**
        *场地特殊信息5
        */
       public Attribute5: string = "";
       /**
        *场地特殊信息6
        */
       public Attribute6: string = "";
   
    }
    SerializerCreator.Register("GameIF.Common.GRSpareAttrib", function () {return new GRSpareAttrib()})
    TSRH.RSerializer("GameIF.Common.GRSpareAttrib", "12|Attribute1&12|Attribute2&12|Attribute3&12|Attribute4&12|Attribute5&12|Attribute6", "GameIF.Common.GRSpareAttrib");

}