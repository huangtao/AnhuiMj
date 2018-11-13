
import UIBase from "./UIBase";
import { NumStack, KeyValue } from "../../CustomType/NumStack";
import { NumItem } from "../JoinRoom/NumItem";
import { KeyItem } from "../JoinRoom/KeyItem";

const { ccclass, property } = cc._decorator;
@ccclass
export abstract class EnterNumForm extends UIBase<any>{
    @property(cc.Layout)
    nums: cc.Layout=null;

    @property(cc.Layout)
    keys: cc.Layout=null;

    @property(cc.Prefab)
    numprefab: cc.Prefab=null;

    @property(cc.Prefab)
    keyprefab: cc.Prefab=null;

    public IsEventHandler: boolean = true;
    public IsKeyHandler: boolean = true;
    protected _numStack: NumStack;
    protected items: Array<NumItem>;
    protected abstract Length();





    onLoad() {
        super.onLoad();
        this._numStack = new NumStack(this.Length());
        this.items = new Array();
        for (let i = 0; i < this.Length(); i++) {
            const newNode = cc.instantiate(this.numprefab);
            const u = <NumItem>newNode.getComponent(NumItem);
            u.Show(this.nums.node);

            if (0 == i || this.Length() - 1 == i) {
                // 更换底图
                if (u.frame_oval && u.sp_bg) {
                    u.sp_bg.spriteFrame = u.frame_oval;

                    if (this.Length() - 1 == i) {
                        u.sp_bg.node.scaleX = -1;
                    }
                }
            }

            this.items.push(u);
        }

        const arr: cc.Node[] = new Array();
        for (let i = 0; i < 12; i++) {
            const newNode = cc.instantiate(this.keyprefab);
            const u = <KeyItem>newNode.getComponent(KeyItem);
            u.Value = i;
            u.form = this;
            u.Init();
            arr.push(newNode);
        }
        
        this.keys.node.addChild(arr[1]);
        this.keys.node.addChild(arr[2]);
        this.keys.node.addChild(arr[3]);
        this.keys.node.addChild(arr[4]);
        this.keys.node.addChild(arr[5]);
        this.keys.node.addChild(arr[6]);
        this.keys.node.addChild(arr[7]);
        this.keys.node.addChild(arr[8]);
        this.keys.node.addChild(arr[9]);
        this.keys.node.addChild(arr[11]);
        this.keys.node.addChild(arr[0]);
        this.keys.node.addChild(arr[10]);
    }

    public OnKeyClick(value: cc.KEY): boolean {
        cc.log(value);
        let uyivalue: number;
        if (value >= 96 && value <= 105) {
            this.onEnter(value - 96);
            return true;
        }
        if (value >= 48 && value <= 57) {
            this.onEnter(value - 48);
            return true;
        }
        if (value === cc.KEY.backspace || value == cc.KEY.Delete) {
            this.onEnter(KeyValue.KeyDelete);
            return true;
        }
        return false;
    }

    onEnter(key: number) {
        if (key < KeyValue.KeyDelete && key >= KeyValue.Key0) {
            this.EnterNum(key);
            return;
        }
        if (key === KeyValue.KeyDelete) {
            this.deleteClick();
            return;
        }
        if (key === KeyValue.KeyClear) {
            this._numStack.Clear();
            this.refresh();
        }
    }

    private deleteClick() {
        this._numStack.DeleteNum();
        this.refresh();
    }
    private EnterNum(num) {
        this._numStack.EnterNum(num);
        this.refresh();
        const length = this._numStack.NumStr.length;
        if (length >= this.Length()) {
            this.Start();
        }

    }

    /**
     * 重新创建数字输入框
     */
    reCreateInputNumItem(){
        this.items = [];
        this.nums.node.removeAllChildren();

        for (let i = 0; i < this.Length(); i++) {
            const newNode = cc.instantiate(this.numprefab);
            const u = <NumItem>newNode.getComponent(NumItem);
            u.Show(this.nums.node);

            if (0 == i || this.Length() - 1 == i) {
                // 更换底图
                if (u.frame_oval && u.sp_bg) {
                    u.sp_bg.spriteFrame = u.frame_oval;

                    if (this.Length() - 1 == i) {
                        u.sp_bg.node.scaleX = -1;
                    }
                }
            }
            
            this.items.push(u);
        }

        this.Clear();
    }

    private refresh() {
        const str = this._numStack.NumStr;
        for (let i = 0; i < this.Length(); i++) {
            if (i >= str.length) {
                this.items[i].SetText("");
            } else {
                this.items[i].SetText(str[i]);
            }
        }
    }

    protected OnShow() {
        super.OnShow();
        this.Clear();
    }

    public Clear() {
        this._numStack.Clear();
        this.refresh();
    }


    protected abstract Start();


}