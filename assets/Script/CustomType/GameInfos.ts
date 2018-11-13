import { QL_Common } from "../CommonSrc/QL_Common";
import ConfigData from "../Global/ConfigData";
import Dictionary from "./Dictionary";

export class StructCityGame{
    private _name: string;
    private _games: Array<QL_Common.GameInfo>;
}

export class GameInfos {
    private _gameinfos: Array<QL_Common.GameInfo>;
    private _cityGames: Dictionary<string,Array<QL_Common.GameInfo>>;

    public get CityGames(): Dictionary<string,Array<QL_Common.GameInfo>> {
        if (!this._cityGames) {
            this._cityGames = new Dictionary<string,Array<QL_Common.GameInfo>>();
        }
        return this._cityGames;
    }

    public set CityGames(dict: Dictionary<string,Array<QL_Common.GameInfo>>){
        this._cityGames = dict;
    }

    public get GameInfos(): Array<QL_Common.GameInfo> {
        return this._gameinfos;
    }

    public set GameInfos(infos: Array<QL_Common.GameInfo>) {

        if (ConfigData.GameList[0] == 1) {
            this._gameinfos = infos;
            this.SetCityGames();
            return;
        }
        const array = new Array();

        for (let i = 0; i < ConfigData.GameList.length; i++) {
            for (let j = 0; j < infos.length; j++) {
                const game = infos[j];
                if (game.GameID !== ConfigData.GameList[i]) continue;
                //如果游戏隐藏 不取列表
                if (game.GameStatus === QL_Common.GameState.Hide) break;
                //如果游戏显示但不准进入
                if (game.GameStatus === QL_Common.GameState.ShowCannotJoin) break;
                array.push(game);
                break;
            }
        }

        this._gameinfos=array;
    }

    public Contains(id: number): boolean {
        if (!this._gameinfos) return false;
        const length = this._gameinfos.length;
        for (let i = 0; i < length; i++) {
            const info = this._gameinfos[i];
            if (info.GameID === id) {
                return true;
            }
        }
        return false;
    }

    public GetGame(id: number) {
        if (!this._gameinfos) return null;
        const length = this._gameinfos.length;
        for (let i = 0; i < length; i++) {
            const info = this._gameinfos[i];
            if (info.GameID === id) {
                return info;
            }
        }
        return null;
    }

    public GetGamesByType(t: QL_Common.GameType) {
        const arr: Array<QL_Common.GameInfo> = [];
        if (!this._gameinfos) return arr;
        if (t > 3 || t < 1) return arr;
        const length = this._gameinfos.length;
        for (let i = 0; i < length; i++) {
            const info = this._gameinfos[i];
            if (info.GameType === t) {
                arr.push(info);
            }
        }
        return arr;
    }
    /**
     * @Author   WangHao
     * @DateTime 2018-07-28
     * @Desc     获取游戏列表根据游戏所在城市分类
     */
    public SetCityGames() {
        
        if (this.CityGames) {
            this.CityGames.Clear();
           const length = this._gameinfos.length;
            for (let i = 0; i < length; i++) {
                const info = this._gameinfos[i];
                let tmpArr: Array<QL_Common.GameInfo> = this._cityGames.GetValue(info.GameCity); 
                if (!tmpArr) {
                    tmpArr = [];
                    tmpArr.push(info);
                    this._cityGames.AddOrUpdate(info.GameCity,tmpArr);
                }else{
                    tmpArr.push(info);
                }
            }
        }
    }
}

/** 
 * 城市名称枚举
 */
export enum CityName{
    CHAGNWAN   = "常玩",
    TUIJIAN    = "推荐",
    
    HEFEI      = "合肥",
    WUHU       = "芜湖",
    BENGBU     = "蚌埠",
    HUAINAN    = "淮南",
    MAANSHAN   = "马鞍山",
    HUAIBEI    = "淮北",
    TONGLING   = "铜陵",
    ANQING     = "安庆",
    HUANGSHAN  = "黄山",
    FUYANG     = "阜阳",
    SUZHOU     = "宿州",
    CHUZHOU    = "滁州",
    LIUAN      = "六安",
    XUANCHENG  = "宣城",
    CHIZHOU    = "池州",
    BOZHOU     = "亳州",
    MINGGUANG  = "明光"
}