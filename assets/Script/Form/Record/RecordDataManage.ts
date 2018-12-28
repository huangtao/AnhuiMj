import { RecordInfo ,RecordListItem,RoundDetailInfoItem, RoundDetailInfo } from "./RecordDataStruct";
import { WebRequest } from "../../Net/Open8hb";
import Dictionary from "../../CustomType/Dictionary";
import { Action, ActionNet } from "../../CustomType/Action";
import DataCache from "../../Global/DataCollection";
import Global from "../../Global/Global";

export class RecordDataManage {
	private static _instance: RecordDataManage;
	private _recordList = new Dictionary<string,RecordInfo>();
	private _recordDetailList = new Dictionary<string,Array<RoundDetailInfo>>();

	public static get Instance(): RecordDataManage{
		if (!RecordDataManage._instance) {
			RecordDataManage._instance = new RecordDataManage();
		}

		return RecordDataManage._instance;
	}

    /**
     * 是否正在请求数据
     */
    private _isRequesting: boolean = false;

	/**
	 * 请求的开始索引号
	 */
	private _startId = 0;

	/**
	 * 一次请求的数量
	 */
	private _count = 5;

    public get isRequesting(){
        return this._isRequesting;
    }

	public get RecordList(): Dictionary<string,RecordInfo>{
        if (!this._recordList) {
            this._recordList = new Dictionary<string,RecordInfo>();
        }
		return this._recordList;
	}

	public set RecordList(data: Dictionary<string,RecordInfo>){
		this._recordList = data;
	}

    public get RecordDetailList(): Dictionary<string,Array<RoundDetailInfo>>{
        return this._recordDetailList;
    }

    public set RecordDetailList(data: Dictionary<string,Array<RoundDetailInfo>>){
        this._recordDetailList = data;
    }

	/**
	 * 请求战绩数据
	 * act 请求回调
	 */
	public reuqestRecordLit(act: Action,startId = -1, count = 6): void{
        if (0 == startId) {
            this._startId = startId;
        }

        if (-1 == this._startId) {
            return;
        }

        if (this._isRequesting) {
            return;
        }

        Global.Instance.UiManager.ShowLoading("正在获取战绩数据");

		this._isRequesting = true;
        let action_ = act;
        let getListCb = (args)=>{
            this._isRequesting = false;
            Global.Instance.UiManager.CloseLoading();

            if (!args || !args.status) {
                this._isRequesting = false;
                return;
            }
            
            if ("success" != args.status) {
            	console.log("--- reuqestRecordLit fail!");
                this._isRequesting = false;
                return;
            }

            console.log("--- success: reuqestRecordLit: ",args);
            this._startId = args.nextStartId;
            this.dealRecordData(args.data);

            // 回调
            if (action_) {
                action_.Run([args]);
            }
        }

        /**
         * 默认开始索引0，一次请求数量为5如果传值则重新赋值，否则每次从当前索引再次请求默认数量的数据
         * @type {[type]}
         */
        let _count = count;

        if (!count) {
        	_count = this._count;
        }else{
        	this._count = count;
        }

        
        // 清空缓存数据
        if (0 == this._startId) {
            this.RecordList.Clear();
        }

        // 拉取战绩列表
        let data: Dictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("startId",this._startId);
        data.Add("count",_count);
        const action: ActionNet = new ActionNet(this,getListCb,getListCb);
        WebRequest.replay.getTotalRecordLIst(action,data);       
    }

    /**
     * 请求每局详情列表
     * act 请求回调
     */
    public reuqestRoundDetailList(mid: string, act: Action): void{
        if (!mid) {
            cc.info('--- reuqestRoundDetailList mid is invalid');
            this._isRequesting = false;
            return;
        }

        let _mid = mid;
        let action_ = act;

        let detailInfo = this.RecordList.GetValue(mid);

        if (detailInfo) {
            // 回调
            if (action_) {
                action_.Run([detailInfo]);
            }

            return;
        }

        if (this._isRequesting) {
            return;
        }

        this._isRequesting = true;
        
        let getSubReplayCb = (args)=>{
            this._isRequesting = false;
            Global.Instance.UiManager.CloseLoading();

            if (!args || !args.status) {
                return;
            }
            
            if ("success" != args.status) {
                console.log("--- reuqestRoundDetailList fail!");
                return;
            }

            if (0 == args.data.length) {
                return;
            }

            console.log("--- success: reuqestRoundDetailList: ",args);
            this.dealRecordDetailData(args.data);

            // 回调
            if (action_) {
                let detailInfo = this.RecordDetailList.GetValue(args.data[0].recordId + '');
                action_.Run([args]);
            }
        }

        // 拉取每局详情列表
        let data: Dictionary<string,any> = WebRequest.DefaultData(true);
        data.Add("mId",mid);
        const action: ActionNet = new ActionNet(this,getSubReplayCb,getSubReplayCb);
        WebRequest.replay.getSubReplayList(action,data);  
        Global.Instance.UiManager.ShowLoading('正在获取数据');
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-08-15
     * @Desc     处理战绩数据成我们所需要的数据结构
     */
    private dealRecordData(data: any): void{
    	if (!data || 0 == data.length) {
    		return;
    	}
        
        // 先进行时间升序排序
        let list = data.sort((a,b)=>{
            return b.addTime - a.addTime
        });

    	for (var i = 0; i < list.length; ++i) {
            let item = list[i];
    		let recordInfo:RecordInfo = new RecordInfo();
            recordInfo.recordId = item.recordId;
            recordInfo.mId = item.mId;
            recordInfo.roomId = item.roomId;
            recordInfo.gameId = item.gameId;
            recordInfo.ownerId = item.ownerId;
            recordInfo.tableId = item.tableId;
            recordInfo.addtime = item.addtime;
            recordInfo.gameNum = item.gameNum;

            let scoreList = new Array<RecordListItem>();

            let fzIndex = 0;
            for (var idx = 0; idx < item.userData.length; ++idx) {
                let recordListItem = new RecordListItem();
                let tmp = item.userData[idx];
                recordListItem.userid = tmp.userid;
                recordListItem.nickname = tmp.nickname;
                recordListItem.moneynum = tmp.moneynum;

                if (recordInfo.ownerId == tmp.userid) {
                    fzIndex = idx;
                }

                scoreList.push(recordListItem);
            }
            // 房主排在最前面
            let tmpData = scoreList[0];
            scoreList[0] = scoreList[fzIndex];
            scoreList[fzIndex] = tmpData;
            
            recordInfo.scoreList = scoreList;
            this.RecordList.AddOrUpdate(recordInfo.recordId + '',recordInfo);
    	}
    	
    	cc.info("--- recordDataList: ", this.RecordList);
    }

    /**
     * @Author   WangHao
     * @DateTime 2018-09-25
     * @Desc     注释注释
     */
    private dealRecordDetailData(data: any): void{
        if (!data || 0 == data.length) {
            return;
        }

        let list = data;
        let detailArray = new Array<RoundDetailInfo>();
        let recordId;

        for (var i = 0; i < list.length; ++i) {
            let item = list[i];

            let detailInfo:RoundDetailInfo = new RoundDetailInfo();
            detailInfo.recordId = item.recordId;
            detailInfo.recPath = item.recPath;

            if (!recordId) {
                recordId = detailInfo.recordId;
            }

            let detailItemList = new Array<RoundDetailInfoItem>();
            let recordInfo = this.RecordList.GetValue(recordId + '');
            let indexArray = new Array<number>();
            // 因服务器返回的数据和战绩列表中的排序不一致，所以客户端要根据战绩列表进行排序。

            if (!recordInfo && 1 == this.RecordList.Count) {
                recordInfo = this.RecordList.Values[0];
                recordId = recordInfo.recordId;
            }

            let detailList = item.data;
            for (let idx = 0; idx < recordInfo.scoreList.length; ++idx) {
                for (var index = 0; index < detailList.length; ++index) {
                    if (recordInfo.scoreList[idx].userid == detailList[index].userid) {
                        indexArray.push(index);
                        continue;
                    }
                }
            }

            for (var idx = 0; idx < detailList.length; ++idx) {
                let detailItemInfo: RoundDetailInfoItem = new RoundDetailInfoItem();
                let detailItem = item.data[indexArray[idx]];

                if (!detailItem) {
                    continue;
                }
                
                detailItem.recordid = detailItem.recordid;
                detailItem.userid = detailItem.userid;
                detailItem.moneynum = detailItem.moneynum;
                detailItemList.push(detailItem);
            }

            detailInfo.detailListItem = detailItemList;
            detailArray.push(detailInfo);
        }

        this.RecordDetailList.AddOrUpdate(recordId + '',detailArray);
        cc.info("--- recordDetailList: ", this.RecordDetailList);
    }
}