import { IPanelManager } from "../Interface/IPanelManager";
import { PanelBase } from "../Form/Base/PanelBase";


export class PanelManager implements IPanelManager {

    private nodePoolManger: any = {};

    GetNodePool(name: string) :cc.NodePool{
        if (!cc.isValid(name) || name.length <= 0) {
            return null;
        }
        while (true) {
            let m: cc.NodePool = this.nodePoolManger[name];
            if (cc.isValid(m)) {
                return m;
            }
            this.nodePoolManger[name] = new cc.NodePool();
        }
    }
    GetPanel(name: string, callBack: Function): PanelBase<any> {

        while (true) {

            let pool = this.GetNodePool(name);
            if (pool.size() < 0) {
                break;
            }
            let poolNode: cc.Node = pool.get();
            if (cc.isValid(poolNode)) {
                let pbase = poolNode.getComponent<PanelBase<any>>(PanelBase);
                if (pbase.isValid) {
                    return pbase;
                }
            }
        }
        cc.loader.loadRes(name, function (err, prefab: cc.Prefab) {
            const newNode: cc.Node = cc.instantiate(prefab);
            let pbase = newNode.getComponent<PanelBase<any>>(PanelBase);
            if (pbase.isValid) {
                pbase.PanelName = name;
                callBack(pbase);
            }
        });
        return null;
    }
    ShowPanel(name: string, root?: cc.Node, param?: any) {
        // let thisObj = this;
        let p: PanelBase<any> = this.GetPanel(name, (cp) => {
            this.show_panel(cp, root, param);
        });
        this.show_panel(p, root, param);
    }
    private show_panel(panel: PanelBase<any>, root?: cc.Node, param?: any) {

        if(!cc.isValid(panel))return;

        panel.Show(root,param);
    }
    
}