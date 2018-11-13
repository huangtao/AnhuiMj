
export namespace HallNodePools {
    
     

    export class PYGroup { 

        /**
         * 群组集合对象缓存对象池
         */
        public static PYGroupListItemPool: cc.NodePool = new cc.NodePool(`PYGroupItem`);
        /**
         * 群组玩家信息的预制体对象池
         */
        public static PYGroupUserItemPool: cc.NodePool = new cc.NodePool(`PYGroupUserItem`); 
        /**
         * 群组信息的预制体对象池
         */
        public static PYGroupMsgItemPool: cc.NodePool = new cc.NodePool(`PYGroupMsgItem`); 
        /**
         * 群创建房间对象预制体对象池
         */
        public static PYRoomItemPool: cc.NodePool = new cc.NodePool(`PYRoomItem`); 

    }


}