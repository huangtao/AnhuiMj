import { QL_Common } from "../../CommonSrc/QL_Common";
import { LengthLineItem } from "./LengthLineItem";
import { LoadHeader } from "../../Tools/Function";
import Global from '../../Global/Global';


const { ccclass, property } = cc._decorator;
@ccclass
export class HeaderItem extends cc.Component {
    idx: number;

    /**
     * 头像
     */
    @property(cc.Sprite)
    header: cc.Sprite=null;

    @property(cc.SpriteFrame)
    DefaultHeader: cc.SpriteFrame=null;

    /**
     * 玩家昵称
     */
    @property(cc.Label)
    playerName : cc.Label = null;

    /**
     * 关联的线
     */
    @property([LengthLineItem])
    LengthLines: LengthLineItem[]=[];

    public Latitude: number = 0;
    public Longitude: number = 0;

    public PlayerInfo: QL_Common.TablePlayer = null;
    private _init = false;
    private init() {
        if (this._init) return;
        this._init = true;
        for (let i = 0; i < this.LengthLines.length; i++) {
            this.LengthLines[i].AddHeader(this);
        }
    }

    // onLoad() {
    //     this.init();
    // }

    public SetPlayer(player: QL_Common.TablePlayer, nextPlayer: QL_Common.TablePlayer, playerNum : number) {
        if (!player) {
            this.PlayerLeave();
            return;
        }
        this.PlayerInfo = player;
        if(player.CAttachData.length > 0){
            for (let i = 0; i < player.CAttachData.length; i++) {
                switch (player.CAttachData[i].Key) {
                    case "Latitude":
                        this.Latitude = parseFloat(player.CAttachData[i].Value);
                        cc.log("this.Latitude:" + this.Latitude);
                        break;
                    case "Longitude":
                        this.Longitude = parseFloat(player.CAttachData[i].Value);
                        cc.log("this.Longitude:" + this.Longitude);
                        break;
                }
            }
        }
        
        this.init();

        LoadHeader(player.FaceID, this.header);
        this.playerName.string = player.NickName;

        if(playerNum > 0){
            if(playerNum >= 4){
                for (let i = 0; i < this.LengthLines.length; i++) {
                    this.LengthLines[i].Flush();
                }
            }else{
                if(nextPlayer){
                    this.LengthLines[0].Flush();
                }
            }
        }    
    
        // for (let i = 0; i < this.LengthLines.length; i++) {
        //     this.LengthLines[i].Flush();
        // }
    }

    public PlayerLeave() {
        this.PlayerInfo = null;
        this.Latitude = 0;
        this.Longitude = 0;
        this.playerName.string = "";
        this.header.spriteFrame = this.DefaultHeader;
        // this.LengthLines[0].Flush();
        for (let i = 0; i < this.LengthLines.length; i++) {
             this.LengthLines[i].Flush();
        }
    }


}