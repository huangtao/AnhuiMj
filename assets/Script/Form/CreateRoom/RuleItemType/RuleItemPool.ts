/**
 * 规则面板 选项框缓存池
 */
import Dictionary from "../../../CustomType/Dictionary";

export default class RuleItemPool extends cc.NodePool{
	private static _instance: RuleItemPool = null;

	public static get Instance(): RuleItemPool{
		if (!RuleItemPool._instance) {
			RuleItemPool._instance = new RuleItemPool();
		}

		return RuleItemPool._instance;
	}

	/**
     * 游戏规则选项框Item的缓存
     */
    public GameRuleItemPool: cc.NodePool = new cc.NodePool("GameRuleItemPool");

    /**
     * 预制体缓存
     */
    
    public GameRuleItemPrefabCache = new Dictionary<string,cc.Prefab>();

    public getGameRuleItemPrefab(name: string): cc.Prefab{
		return this.GameRuleItemPrefabCache.GetValue(name);
    }

    public putGameRuleItemPrefab(key: string ,prefab: cc.Prefab){
    	if (!key || !cc.isValid(prefab)) {
    		return;
    	}

    	this.GameRuleItemPrefabCache.AddOrUpdate(key,prefab);
    }

    /**
     * 加载预制体
     */
    public loadPrefab() {
        cc.loader.loadResDir("Prefabs/CreateRoom/RuleItemType",cc.Prefab, (err, assets)=> {
            if (err) {
                cc.log("fail to load ruleItem ",err);
                return;
            }

            if (assets) {
                for (var idx = 0; idx < assets.length; ++idx) {
                    this.putGameRuleItemPrefab(assets[idx].data.name,assets[idx]);
                }
                cc.log("success to load ruleItem prefab  ",assets)
                // this.putGameRuleItemPrefab();
            }
        });

    }
}