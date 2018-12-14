

import UIBase from "../Base/UIBase";
import { Action } from "../../CustomType/Action";
import { ChatItem } from "./ChatItem";
import SendMessage from "../../Global/SendMessage";
import { ChatType } from "../../CustomType/Enum";

const { ccclass, property } = cc._decorator;

@ccclass
export class ChatForm extends cc.Component {

    CloseAction: Action[];

    ChatString: string[];

    @property(cc.ScrollView)
    emojiGroup: cc.ScrollView=null;

    @property(cc.Prefab)
    chatPrefab:cc.Prefab=null;

    
    @property(cc.ScrollView)
    textGroup: cc.ScrollView=null;


    @property([cc.SpriteFrame])
    pk_sprites: cc.SpriteFrame[]=[];

    @property([cc.SpriteFrame])
    mj_sprites: cc.SpriteFrame[]=[];

    onLoad() {
    }

    Init() {
        let scene = cc.director.getScene();
        if(scene.name == "M_BiJi"|| scene.name == "M_PDK"){
            this.InitData(this.pk_sprites);
        }else{
            this.InitData(this.mj_sprites);
        }
    }

    InitData(sprites : cc.SpriteFrame[]){
        // let scale = 1;
        for (let i = 0; i < sprites.length; i++) {
            const node = new cc.Node("spite");
            const btn = node.addComponent<cc.Button>(cc.Button);
            const e = new cc.Component.EventHandler();

            e.target = this.node;
            e.component = "ChatForm";
            e.handler = "onEmojiClick";
            e.customEventData = (i + 1) + "";
            btn.clickEvents.push(e);

            const sprite = node.addComponent<cc.Sprite>(cc.Sprite);
            sprite.spriteFrame = sprites[i];
            sprite.type = cc.Sprite.Type.SIMPLE;
            // sprite.sizeMode = cc.Sprite.SizeMode.RAW
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            node.width = 100;
            node.height = 100;

            cc.log(`width = ${node.width},height = ${node.height}`);


            // node.width *= scale;
            // node.height *= scale;
            // node.height = 165;
            // node.scale = 0.5;

            node.parent = this.emojiGroup.content;
        }
        if (!this.ChatString || !(this.ChatString.length > 0)) {
            return;
        }
        const action = new Action(this, this.onItemClick)
        for (let i = 0; i < this.ChatString.length; i++) {
            const node = cc.instantiate(this.chatPrefab);
            node.parent = this.textGroup.content;
            const c = node.getComponent<ChatItem>(ChatItem);
            c.action = action;
            c.Init(i, this.ChatString[i]);
        }
    }   

    public Show(root: cc.Node = cc.Canvas.instance.node) {
        if (!root) return;
        if (!cc.isValid(this)) return;
        if (this.node.parent) return;
        this.node.parent = root;
        this.checkGroup(null, "1");
    }



    Close() {
        if (!cc.isValid(this)) return;
        if (!this.node.parent) return;
        this.node.removeFromParent();
        if (this.CloseAction) {
            for (let i = 0; i < this.CloseAction.length; i++) {
                if (this.CloseAction[i]) {
                    this.CloseAction[i].RunArgs();
                }
            }
        }

    }

    checkGroup(e,idx){
        if(idx=="1"){
            this.emojiGroup.node.active=true;
            this.textGroup.node.active=false;
        }else{
            this.emojiGroup.node.active = false;
            this.textGroup.node.active = true;
        } 
    }

    private onEmojiClick(e, idx: string , test) {
        this.onItemClick(ChatType.Emoji, parseInt(idx))
    }

    onItemClick(type: ChatType, idx: number) {
        SendMessage.Instance.ChartMsg(type, idx + "");
        this.Close();
    }



}