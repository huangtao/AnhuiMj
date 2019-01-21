


export interface IPanelManager {
    GetNodePool(name: string) :cc.NodePool;
    ShowPanel(name: string, root?: cc.Node, param?: any) 
}