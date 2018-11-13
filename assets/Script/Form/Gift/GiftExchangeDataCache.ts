import Dictionary from "../../CustomType/Dictionary";
// import GiftInfos from "GiftInfos";
export default class GiftExchangeDataCache {
	private static _instance: GiftExchangeDataCache;

	public static get Instance(): GiftExchangeDataCache{
		if (!GiftExchangeDataCache._instance) {
			GiftExchangeDataCache._instance = new GiftExchangeDataCache();
		}
		return GiftExchangeDataCache._instance;
	}	

	private giftInfoList : Dictionary<string,Array<GiftInfos>>;
	public get giftCategoryList() : Dictionary<string,Array<GiftInfos>>{
		if(!this.giftInfoList){
			this.giftInfoList = new Dictionary<string,Array<GiftInfos>>();
			this.initGiftInfoList();

		}
		return this.giftInfoList;
	}

	private initGiftInfoList():void{
		
	}
   
}



