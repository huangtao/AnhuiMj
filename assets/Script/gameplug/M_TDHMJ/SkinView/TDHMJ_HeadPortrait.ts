const {ccclass, property} = cc._decorator;

@ccclass
export default class TDHMJ_HeadPortrait extends cc.Component {

    @property(cc.Sprite)
    spi_headPortrait:cc.Sprite = null;


    onLoad() {
        // init logic
        
    }

    public Init():void{

    }
    /**
     * 设置头像图片
     * @param url 
     */
    public setHeadPortSpri(url:string):void{
        if(url==null){
            return;
        }
        var pic:cc.SpriteFrame=new cc.SpriteFrame(url);
        this.spi_headPortrait.spriteFrame=pic;
    }
}
