import { BiJi } from "../GameHelp/BJ_IBiJiClass";
import M_BiJiView from "../M_BiJiView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelectCards extends cc.Component {
    @property([cc.Button])
    selectPlace: cc.Button[] = [];
    @property([cc.Button])
    selectFinish: cc.Button[] = [];
    @property([cc.Button])
    tipButton: cc.Button[] = [];
    @property([cc.Sprite])
    firstCards: cc.Sprite[] = [];
    @property([cc.Sprite])
    secondCards: cc.Sprite[] = [];
    @property([cc.Sprite])
    thirdCards: cc.Sprite[] = [];
    @property([cc.Label])
    cardType: cc.Label[] = [];
    @property(cc.Button)
    sortButton: cc.Button = null;
    @property(cc.Button)
    dropButton: cc.Button = null;
    @property(cc.Button)
    revertButtonOne: cc.Button = null;
    @property(cc.Button)
    revertButtonTwo: cc.Button = null;
    @property(cc.Button)
    revertButtonThree: cc.Button = null;
    @property(cc.Sprite)
    sortBig:cc.Sprite = null;
    @property(cc.Sprite)
    sortColor:cc.Sprite = null;
    private AllCard:Array<number>;
    private cards: number[] = [];
    private headcards:number[]=[];
    private oppocards:number[]=[];
    private lastcards:number[]=[];
    private fenlianpai:number[]=[];
    private cardcolor:number[] =[];
    private tempcards:Array<number>;
    private baozitips:Array<number>;
    private tempsanqing:Array<number>;
    private sanqingtips:Array<number>;
    private shunzitips:Array<number>;
    public sortType:boolean;
    private sanQingClick:number;
    private baoziClick:number;
    private shunziClick:number;
    private shunqingClick:number;


    public get skingameView(): M_BiJiView { return M_BiJiView.Instance; }


    onload() {
    }
    
    Init() {
        this.tempcards = new Array<number>();
        this.AllCard = new Array<number>();
        this.baozitips = new Array<number>();
        this.tempsanqing = new Array<number>();
        this.sanqingtips = new Array<number>();
        this.shunzitips = new Array<number>();
        this.sanQingClick = 0;
        this.baoziClick = 0;
        this.shunziClick = 0;
        this.shunqingClick = 0;
        for (var i = 0; i < this.selectPlace.length; i++) {
            this.selectPlace[i].interactable = false;
        }
        for (var i = 0; i < this.selectFinish.length; i++) {
            this.selectFinish[i].node.active = false;
        }
        for (var i = 0; i < this.tipButton.length; i++) {
            this.tipButton[i].interactable = false;
        }
        for(var i = 0;i<15;i++){
            this.fenlianpai[i] = 0;
        }
        for(var i = 0;i<4;i++){
            this.cardcolor[i] = 0;
        }
         for (var i = 0; i < 3; i++) {
            this.firstCards[i].spriteFrame = null;
            this.secondCards[i].spriteFrame = null;
            this.thirdCards[i].spriteFrame = null;
            this.firstCards[i].node.active = false;
            this.secondCards[i].node.active = false;
            this.thirdCards[i].node.active = false;
            this.cardType[i].string = "";
        }
        this.sortType = false;
        this.revertButtonOne.node.active = false;
        this.revertButtonTwo.node.active = false;
        this.revertButtonThree.node.active = false;


    }
    private HideButtonTips(){
        for(var i = 0;i<this.tipButton.length;i++){
            this.tipButton[i].interactable = false;
        }
    }
    private clearTipTemp(){
        this.sanqingtips.splice(0,this.sanqingtips.length);
        this.tempsanqing.splice(0,this.tempsanqing.length);
    }
    private CheckButtonTips(){
        this.clearTipTemp();
        for(var i = 0;i<4;i++){
            this.cardcolor[i] = 0;
        }
        for(var i = 0;i<15;i++){
            this.fenlianpai[i] = 0;
        }
         this.GetCardTypeTips(this.AllCard);
          if(this.CheckHaveBaoZi()>=0){
            this.tipButton[3].interactable = true;
        } else{
            this.tipButton[3].interactable = false;
        }
        if(this.CheckHaveSanQing()>=0){
         this.tipButton[1].interactable = true;           
        }else{
            this.tipButton[1].interactable = false;
        }
        if(this.CheckHaveShunZi()>=0) {
             this.tipButton[0].interactable = true;
        }else{
            this.tipButton[0].interactable = false;
        }
        if(this.CheckHaveShunQing()){
            this.tipButton[2].interactable = true;
        }else{
            this.tipButton[2].interactable = false;
        }
    }
    ShowSelf(value:boolean) {
        this.node.active = true;
        if(value){
            this.dropButton.interactable = true;
        }else{
            this.dropButton.interactable = false;
        }
        this.GetCardTypeTips(this.AllCard);
        if(this.CheckHaveBaoZi()>=0){
            this.tipButton[3].interactable = true;
        } else{
            this.tipButton[3].interactable = false;
        }
        if(this.CheckHaveSanQing()>=0){
         this.tipButton[1].interactable = true;           
        }else{
            this.tipButton[1].interactable = false;
        }
        if(this.CheckHaveShunZi()>=0) {
             this.tipButton[0].interactable = true;
        }else{
            this.tipButton[0].interactable = false;
        }
        if(this.CheckHaveShunQing()) {
            this.tipButton[2].interactable = true;
        }else{
            this.tipButton[2].interactable = false;
        }
    }
    //设置头道、中道、尾道按钮是否可点击
    SetCanClickButton(value: boolean) {
        for (var i = 0; i < this.selectPlace.length; i++) {
            this.selectPlace[i].interactable = value;
        }
        cc.log("select视图开放按钮");
    }
    SetCards(cards: number[]) {
        for(var i = 0;i<cards.length;i++){
            this.cards[i] = cards[i];
        }
        //this.cards = cards;
    }
    SetAllCard(cards:number[]){

        this.AllCard = cards;
      
    }






    //
    //==================================================按钮点击事件=================
    //

    OnbuttonFirst(){
        this.OnButtonSelectFirst(false);
    }
    OnbuttonSecond(){
        this.OnButtonSelectSecond(false);
    }
    OnbuttonThird(){
        this.OnButtonSelectThird(false);
    }
    OnButtonSelectFirst(value:boolean = false) {
        
        if(this.firstCards[0].node.active&&!value){
            return;
        }
        this.cards = this.SortCard(this.cards,3);
      this.SetCanClickButton(false);
        for (var i = 0; i < this.cards.length; i++) {
            this.firstCards[i].node.active = true;
            this.firstCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.headcards[i] = this.cards[i];
            
        }
        var index0 = this.AllCard.indexOf(this.headcards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.headcards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.headcards[2]);
        this.AllCard.splice(index2,1);
        if(!this.sortType){
            this.skingameView.SortCard(this.AllCard);
        }else{
            this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
        }
        
        switch(this.GetCardCharacterforBiJi(this.headcards)){
            case 0:this.cardType[0].string ="散牌";break;
            case 1:this.cardType[0].string ="对子";break;
            case 2:this.cardType[0].string ="顺子";break;
            case 3:this.cardType[0].string ="同花";break;
            case 4:this.cardType[0].string ="同花顺";break;
            case 5:this.cardType[0].string ="三条";break;
        }
        this.revertButtonOne.node.active = true;
        this.checkFinish();
        this.CheckButtonTips();
          var finish = this.checkAlreaySetPoker();
        switch(finish){
            case 0 :break;
            case 1:break;
            
            case 2: this.SetCards(this.AllCard);
            this.cards = this.SortCard(this.cards,3);
            for (var i = 0; i < this.cards.length; i++) {
            this.secondCards[i].node.active = true;
            this.secondCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.oppocards[i] = this.cards[i];
           
        }
        var index0 = this.AllCard.indexOf(this.oppocards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.oppocards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.oppocards[2]);
        this.AllCard.splice(index2,1);
        this.skingameView.SortCard(this.AllCard);
        switch(this.GetCardCharacterforBiJi(this.oppocards)){
            case 0:this.cardType[1].string ="散牌";break;
            case 1:this.cardType[1].string ="对子";break;
            case 2:this.cardType[1].string ="顺子";break;
            case 3:this.cardType[1].string ="同花";break;
            case 4:this.cardType[1].string ="同花顺";break;
            case 5:this.cardType[1].string ="三条";break;
        }
        this.revertButtonTwo.node.active = true;
         this.HideButtonTips();
            this.checkFinish();
        break;
            case 3:this.SetCards(this.AllCard);
            for (var i = 0; i < this.cards.length; i++) {
            this.thirdCards[i].node.active = true;
            this.thirdCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.lastcards[i] = this.cards[i];
          
        }
         var index0 = this.AllCard.indexOf(this.lastcards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.lastcards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.lastcards[2]);
        this.AllCard.splice(index2,1);
        this.skingameView.SortCard(this.AllCard);
        this.cards = this.SortCard(this.cards,3);
        switch(this.GetCardCharacterforBiJi(this.lastcards)){
            case 0:this.cardType[2].string ="散牌";break;
            case 1:this.cardType[2].string ="对子";break;
            case 2:this.cardType[2].string ="顺子";break;
            case 3:this.cardType[2].string ="同花";break;
            case 4:this.cardType[2].string ="同花顺";break;
            case 5:this.cardType[2].string ="三条";break;
        }
        this.revertButtonThree.node.active = true;
          this.HideButtonTips();
            this.checkFinish();
        break;
        }
           
            
        
        
    }
    OnButtonSelectSecond(value:boolean = false) {
        
        if(this.secondCards[0].node.active&&!value){
            return;
        }
        this.cards = this.SortCard(this.cards,3);
        this.SetCanClickButton(false);
        for (var i = 0; i < this.cards.length; i++) {
            this.secondCards[i].node.active = true;
            this.secondCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.oppocards[i] = this.cards[i];
        }
        var index0 = this.AllCard.indexOf(this.oppocards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.oppocards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.oppocards[2]);
        this.AllCard.splice(index2,1);
        if(!this.sortType){
            this.skingameView.SortCard(this.AllCard);
        }else{
            this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
        }
        
        switch(this.GetCardCharacterforBiJi(this.oppocards)){
            case 0:this.cardType[1].string ="散牌";break;
            case 1:this.cardType[1].string ="对子";break;
            case 2:this.cardType[1].string ="顺子";break;
            case 3:this.cardType[1].string ="同花";break;
            case 4:this.cardType[1].string ="同花顺";break;
            case 5:this.cardType[1].string ="三条";break;
        }
        this.revertButtonTwo.node.active = true;
        if(!value){
            this.checkFinish();
            this.CheckButtonTips();
        }
        
       
        var finish = this.checkAlreaySetPoker();
        switch(finish){
            case 0 :break;
            case 1: this.SetCards(this.AllCard);
            this.cards = this.SortCard(this.cards,3);
            for (var i = 0; i < this.cards.length; i++) {
            this.firstCards[i].node.active = true;
            this.firstCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.headcards[i] = this.cards[i];
           
        }
          var index0 = this.AllCard.indexOf(this.headcards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.headcards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.headcards[2]);
        this.AllCard.splice(index2,1);
        this.skingameView.SortCard(this.AllCard);
        switch(this.GetCardCharacterforBiJi(this.headcards)){
            case 0:this.cardType[0].string ="散牌";break;
            case 1:this.cardType[0].string ="对子";break;
            case 2:this.cardType[0].string ="顺子";break;
            case 3:this.cardType[0].string ="同花";break;
            case 4:this.cardType[0].string ="同花顺";break;
            case 5:this.cardType[0].string ="三条";break;
        }
        this.revertButtonOne.node.active = true;
         if(!value){
            this.checkFinish();
             this.CheckButtonTips();
        }
        break;
            case 2:break;
            case 3:this.SetCards(this.AllCard);
            this.cards = this.SortCard(this.cards,3);
            for (var i = 0; i < this.cards.length; i++) {
            this.thirdCards[i].node.active = true;
            this.thirdCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.lastcards[i] = this.cards[i];
           
        }
         var index0 = this.AllCard.indexOf(this.lastcards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.lastcards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.lastcards[2]);
        this.AllCard.splice(index2,1);
        this.skingameView.SortCard(this.AllCard);
        switch(this.GetCardCharacterforBiJi(this.lastcards)){
            case 0:this.cardType[2].string ="散牌";break;
            case 1:this.cardType[2].string ="对子";break;
            case 2:this.cardType[2].string ="顺子";break;
            case 3:this.cardType[2].string ="同花";break;
            case 4:this.cardType[2].string ="同花顺";break;
            case 5:this.cardType[2].string ="三条";break;
        }
        this.revertButtonThree.node.active = true;
         this.HideButtonTips();
            this.checkFinish();
        break;
        }
    }
    OnButtonSelectThird(value:boolean = false) {
        if(this.thirdCards[0].node.active&&!value){
            return;
        }
       this.SetCanClickButton(false);
   this.cards = this.SortCard(this.cards,3);
        for (var i = 0; i < this.cards.length; i++) {
            this.thirdCards[i].node.active = true;
            this.thirdCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.lastcards[i] = this.cards[i];
        }
         var index0 = this.AllCard.indexOf(this.lastcards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.lastcards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.lastcards[2]);
        this.AllCard.splice(index2,1);
        if(!this.sortType){
            this.skingameView.SortCard(this.AllCard);
        }else{
            this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
        }
        switch(this.GetCardCharacterforBiJi(this.lastcards)){
            case 0:this.cardType[2].string ="散牌";break;
            case 1:this.cardType[2].string ="对子";break;
            case 2:this.cardType[2].string ="顺子";break;
            case 3:this.cardType[2].string ="同花";break;
            case 4:this.cardType[2].string ="同花顺";break;
            case 5:this.cardType[2].string ="三条";break;
        }
        this.revertButtonThree.node.active = true;
        if(!value){
            this.checkFinish();
             this.CheckButtonTips();
        }
        var finish = this.checkAlreaySetPoker();
         switch(finish){
            case 0 :break;
            case 1: this.SetCards(this.AllCard);
            this.cards = this.SortCard(this.cards,3);
            for (var i = 0; i < this.cards.length; i++) {
            this.firstCards[i].node.active = true;
            this.firstCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.headcards[i] = this.cards[i];
           
        }
            var index0 = this.AllCard.indexOf(this.headcards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.headcards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.headcards[2]);
        this.AllCard.splice(index2,1);
        if(!this.sortType){
            this.skingameView.SortCard(this.AllCard);
        }else{
            this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
        }
        switch(this.GetCardCharacterforBiJi(this.headcards)){
            case 0:this.cardType[0].string ="散牌";break;
            case 1:this.cardType[0].string ="对子";break;
            case 2:this.cardType[0].string ="顺子";break;
            case 3:this.cardType[0].string ="同花";break;
            case 4:this.cardType[0].string ="同花顺";break;
            case 5:this.cardType[0].string ="三条";break;
        }
        this.revertButtonOne.node.active = true;
         this.HideButtonTips();
         this.checkFinish();
        break;
            case 2:this.SetCards(this.AllCard);
            this.cards = this.SortCard(this.cards,3);
            for (var i = 0; i < this.cards.length; i++) {
            this.secondCards[i].node.active = true;
            this.secondCards[i].spriteFrame = BiJi.ins.iview.GetCardsRes(this.cards[i]);
            this.oppocards[i] = this.cards[i];
           
        }
        var index0 = this.AllCard.indexOf(this.oppocards[0]);
        this.AllCard.splice(index0,1);
        var index1 = this.AllCard.indexOf(this.oppocards[1]);
        this.AllCard.splice(index1,1);
        var index2 = this.AllCard.indexOf(this.oppocards[2]);
        this.AllCard.splice(index2,1);
        this.skingameView.SortCard(this.AllCard);
        switch(this.GetCardCharacterforBiJi(this.oppocards)){
            case 0:this.cardType[1].string ="散牌";break;
            case 1:this.cardType[1].string ="对子";break;
            case 2:this.cardType[1].string ="顺子";break;
            case 3:this.cardType[1].string ="同花";break;
            case 4:this.cardType[1].string ="同花顺";break;
            case 5:this.cardType[1].string ="三条";break;
        }
        this.revertButtonTwo.node.active = true;        
         this.HideButtonTips();
         this.checkFinish();
        break;
            case 3:
        break;
        }
    }
    OnButtonrevertOne(){
        var num = 0;
        if(this.firstCards[0].node.active){
            num++;
        }
        if(this.secondCards[0].node.active){
            num++;
        }
        if(this.thirdCards[0].node.active){
            num++;
        }

        if(num >= 2){
            this.revertButtonOne.node.active = false;
            this.AllCard = this.AllCard.concat(this.headcards);
            if(!this.sortType){
            this.skingameView.SortCard(this.AllCard);
        }else{
            this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
        }
        for(var i = 0;i<3;i++){
            this.firstCards[i].spriteFrame = null;  
            this.firstCards[i].node.active = false;        
        }
        this.selectFinish[0].node.active = false;
        this.selectFinish[1].node.active = false;
        this.headcards.length = 0;
        this.SetCanClickButton(false);
        this.CheckButtonTips();
        this.sanQingClick = 0;
        this.baoziClick = 0;
        this.shunziClick = 0;
        }else{
            this.OnButtonReset();
        }
    }
        OnButtonrevertTwo(){
        var num = 0;
        if(this.firstCards[0].node.active){
            num++;
        }
        if(this.secondCards[0].node.active){
            num++;
        }
        if(this.thirdCards[0].node.active){
            num++;
        }

        if(num >= 2){
            this.revertButtonTwo.node.active = false;
            this.AllCard = this.AllCard.concat(this.oppocards);
            if(!this.sortType){
            this.skingameView.SortCard(this.AllCard);
        }else{
            this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
        }
         for(var i = 0;i<3;i++){
            this.secondCards[i].spriteFrame = null;    
            this.secondCards[i].node.active = false;      
        }
        this.selectFinish[0].node.active = false;
        this.selectFinish[1].node.active = false;
        this.oppocards.length = 0;
        this.SetCanClickButton(false);
        this.CheckButtonTips();
        this.sanQingClick = 0;
        this.baoziClick = 0;
        this.shunziClick = 0;

        }else{
            this.OnButtonReset();
        }
    }
        OnButtonrevertThree(){
        var num = 0;
        if(this.firstCards[0].node.active){
            num++;
        }
        if(this.secondCards[0].node.active){
            num++;
        }
        if(this.thirdCards[0].node.active){
            num++;
        }

        if(num >= 2){
            this.revertButtonThree.node.active = false;
            this.AllCard = this.AllCard.concat(this.lastcards);
            if(!this.sortType){
            this.skingameView.SortCard(this.AllCard);
        }else{
            this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
        }
        for(var i = 0;i<3;i++){
            this.thirdCards[i].spriteFrame = null;        
            this.thirdCards[i].node.active = false;  
        }
        this.selectFinish[0].node.active = false;
        this.selectFinish[1].node.active = false;
        this.lastcards.length = 0;
        this.SetCanClickButton(false);
        this.CheckButtonTips();
        this.sanQingClick = 0;
        this.baoziClick = 0;
        this.shunziClick = 0;
        }else{
            this.OnButtonReset();
        }
    }

    OnButtonReset() {
        for (var i = 0; i < 3; i++) {
            this.firstCards[i].spriteFrame = null;
            this.secondCards[i].spriteFrame = null;
            this.thirdCards[i].spriteFrame = null;
            this.firstCards[i].node.active = false;
            this.secondCards[i].node.active = false;
            this.thirdCards[i].node.active = false;
            this.cardType[i].string = "";
            this.selectPlace[i].interactable = false;
            
        }
        this.cards.splice(0,this.cards.length);
        this.revertButtonOne.node.active = false;
        this.revertButtonTwo.node.active = false;
        this.revertButtonThree.node.active = false;
        this.selectFinish[0].node.active = false;
        this.selectFinish[1].node.active = false;
        this.skingameView.OnButtonSetCards();
        this.SetCanClickButton(false);
        this.CheckButtonTips();
        this.sanQingClick = 0;
        this.baoziClick = 0;
        this.shunziClick = 0;
    }
    OnButtonFinish(){
        this.skingameView.FinishPoker(this.headcards,this.oppocards,this.lastcards);
    }

    OnButtonSortCard(){  
        if(this.sortType){
             this.skingameView.SortCard(this.SortCard(this.AllCard,this.AllCard.length));
             this.sortType = false;
             this.sortBig.node.active = false;
             this.sortColor.node.active = true;
        }else{
           this.skingameView.SortCard(this.SortCardByColor(this.AllCard,this.AllCard.length));
           this.sortType = true;
           this.sortColor.node.active = false;
           this.sortBig.node.active  = true;
        }      
    }
    OnButtonDropCard(){
        this.skingameView.OnButtonDrop();
    }


    //牌型提示按钮事件
    //===================================================================================
    //
    OnButtonShunZi(){
        var array = [];
        var poolshunzi = [];
        var fenlianshunzi = [];
        for(var i = 0;i<this.AllCard.length;i++){
            array[i] = this.AllCard[i];
        }

       array = this.SortCard(array,array.length);
       for(i = 0;i<array.length-1;i++){
           if((this.GetCardLogicValue(array[i])!=this.GetCardLogicValue(array[i+1]))){
               fenlianshunzi.push(array[i])
               if(array.length-2 == i){
                   fenlianshunzi.push(array[i+1])
               }
           }else{
               if(array.length -2 ==i){
                   fenlianshunzi.push(array[i]);
               }
           }
       }

       for(i = 0;i<fenlianshunzi.length-2;i++){
        if((this.GetCardLogicValue(fenlianshunzi[i])+this.GetCardLogicValue(fenlianshunzi[i+1])+this.GetCardLogicValue(fenlianshunzi[i+2]))/3==this.GetCardLogicValue(fenlianshunzi[i+1])){
            if((this.GetCardLogicValue(fenlianshunzi[i])-this.GetCardLogicValue(fenlianshunzi[i+1]))==1){
            poolshunzi.push(fenlianshunzi[i],fenlianshunzi[i+1],fenlianshunzi[i+2]);
            }

           }
       }
       if((this.GetCardLogicValue(fenlianshunzi[0])==14)&&(this.GetCardLogicValue(fenlianshunzi[fenlianshunzi.length-1])==2)&&(this.GetCardLogicValue(fenlianshunzi[fenlianshunzi.length-2])==3)){
        poolshunzi.push(fenlianshunzi[0],fenlianshunzi[fenlianshunzi.length-1],fenlianshunzi[fenlianshunzi.length-2]);
       }

       if(this.shunziClick>poolshunzi.length/3-1){
           this.shunziClick = 0;
       }
       if(poolshunzi.length>0){
           this.skingameView.UpSanQing(poolshunzi,this.shunziClick);
       }
       this.shunziClick++;      
       
    }

    OnButtonSanQing(){  
        var array = [];      
        var boolsanqing = [];        
        boolsanqing.splice(0,boolsanqing.length);  
        for(var i =0;i<this.AllCard.length;i++){
            array[i] = this.AllCard[i];
        }
        array = this.SortCardByColor(array,array.length);        
        for(i = 0;i<array.length-2;i++){
            if(this.GetCardColor(array[i])==this.GetCardColor(array[i+1])){
                if(this.GetCardColor(array[i])==this.GetCardColor(array[i+2])){
                    boolsanqing.push(array[i],array[i+1],array[i+2]);
                }              
            }
        }
        
                       
   
        if(this.sanQingClick>boolsanqing.length/3-1){
            this.sanQingClick= 0;
        }
        if(boolsanqing.length>0){
            this.skingameView.UpSanQing(boolsanqing,this.sanQingClick);
        }
        this.sanQingClick++;
    }
    OnButtonShunQing(){
         var array = [];     
         var poolshunqing = [];  
         var tempshunqing = [];     
            var heitao:Array<number> = new Array<number>();
            var hongtao:Array<number> = new Array<number>();
            var meihua:Array<number> = new Array<number>();
            var fangpian:Array<number> = new Array<number>();
        for(var i = 0;i<this.AllCard.length;i++){
            array[i] = this.AllCard[i];
        }   
        array = this.SortCardByColor(array,array.length);
     for(i = 0;i<array.length-2;i++){
         if((array[i]-array[i+1])==(array[i+1]-array[i+2])){
             if(array[i]-array[i+1]==1){
                poolshunqing.push(array[i],array[i+1],array[i+2]);
             }            
         }
     }

            for(var i = 0;i<array.length;i++){
                switch(this.GetCardColor(array[i]))
                {
                    case 0:fangpian.push(array[i]);break;
                    case 16:meihua.push(array[i]);break;
                    case 32:hongtao.push(array[i]);break;
                    case 48:heitao.push(array[i]);break;
                }
                
            }
            if(fangpian.length>2){
                    fangpian = this.SortCard(fangpian,fangpian.length);
                    if((this.GetCardLogicValue(fangpian[0])==14)&&(this.GetCardLogicValue(fangpian[fangpian.length-1])==2)&&(this.GetCardLogicValue(fangpian[fangpian.length-2])==3)){
                        poolshunqing.push(fangpian[0],fangpian[fangpian.length-1],fangpian[fangpian.length-2]);
                    }
                     if((this.GetCardLogicValue(fangpian[0])==14)&&(this.GetCardLogicValue(fangpian[1])==13)&&(this.GetCardLogicValue(fangpian[2])==12)){
                        poolshunqing.push(fangpian[0],fangpian[1],fangpian[2]);
                    }
                
            }
            if(meihua.length>2){
                    meihua = this.SortCard(meihua,meihua.length);
                    if((this.GetCardLogicValue(meihua[0])==14)&&(this.GetCardLogicValue(meihua[meihua.length-1])==2)&&(this.GetCardLogicValue(meihua[meihua.length-2])==3)){
                        poolshunqing.push(meihua[0],meihua[meihua.length-1],meihua[meihua.length-2]);
                    }
                    if((this.GetCardLogicValue(meihua[0])==14)&&(this.GetCardLogicValue(meihua[1])==13)&&(this.GetCardLogicValue(meihua[2])==12)){
                        poolshunqing.push(meihua[0],meihua[1],meihua[2]);
                    }

            }
            if(hongtao.length>2){
                    hongtao = this.SortCard(hongtao,hongtao.length);
                    if((this.GetCardLogicValue(hongtao[0])==14)&&(this.GetCardLogicValue(hongtao[hongtao.length-1])==2)&&(this.GetCardLogicValue(hongtao[hongtao.length-2])==3)){
                        poolshunqing.push(hongtao[0],hongtao[hongtao.length-1],hongtao[hongtao.length-2]);
                    }
                    if((this.GetCardLogicValue(hongtao[0])==14)&&(this.GetCardLogicValue(hongtao[1])==13)&&(this.GetCardLogicValue(hongtao[2])==12)){
                        poolshunqing.push(hongtao[0],hongtao[1],hongtao[2]);
                    }

            }
            if(heitao.length>2){
                    heitao = this.SortCard(heitao,heitao.length);
                    if((this.GetCardLogicValue(heitao[0])==14)&&(this.GetCardLogicValue(heitao[heitao.length-1])==2)&&(this.GetCardLogicValue(heitao[heitao.length-2])==3)){
                        poolshunqing.push(heitao[0],heitao[heitao.length-1],heitao[heitao.length-2]);
                    }
                     if((this.GetCardLogicValue(heitao[0])==14)&&(this.GetCardLogicValue(heitao[1])==13)&&(this.GetCardLogicValue(heitao[2])==12)){
                        poolshunqing.push(heitao[0],heitao[1],heitao[2]);
                    }

            }
     


     
      if(this.shunqingClick>poolshunqing.length/3-1){
          this.shunqingClick = 0;
      }
      if(poolshunqing.length>0){
          this.skingameView.UpSanQing(poolshunqing,this.shunqingClick);
      }
      this.shunqingClick++;
    }
    OnButtonBaoZi(){
        var poolbaozi = [];
        poolbaozi.splice(0,poolbaozi.length);
        for(var k = 0;k<this.baozitips.length;k++){
         for(var i = 0;i<this.AllCard.length;i++){
            if((this.GetCardValue(this.AllCard[i])==this.baozitips[k])||(this.GetCardLogicValue(this.AllCard[i])==this.baozitips[k])){
                poolbaozi.push(this.AllCard[i]);
            }
        }
        if(this.sanQingClick>poolbaozi.length/3-1){
            this.baoziClick= 0;
        }
        if(poolbaozi.length>0){
            this.skingameView.UpSanQing(poolbaozi,this.baoziClick);
        }
        
    }
    }

    //
    //===================================================================================
    //



    checkFinish() {        
        if (this.firstCards[0].node.active && this.secondCards[0].node.active && this.thirdCards[0].node.active) {
            if(this.CompareCardCharacter(this.headcards,this.oppocards)){
                var examplecards = [];
                for(var i = 0;i<3;i++){
                 examplecards[i]=this.headcards[i];
                }               
                this.headcards = this.oppocards;
                this.oppocards = examplecards;
                this.SetCards(this.headcards);
                this.OnButtonSelectFirst(true);
                this.SetCards(this.oppocards);
                this.OnButtonSelectSecond(true);
                cc.log("交换1");
            }
            if(this.CompareCardCharacter(this.oppocards,this.lastcards)){
                var examplecards = [];
                for(var i = 0;i<3;i++){
                 examplecards[i]=this.oppocards[i];
                }
                
                this.oppocards = this.lastcards;
                 this.SetCards(this.oppocards);
                this.OnButtonSelectSecond(true);
                this.lastcards = examplecards;               
                this.SetCards(this.lastcards);
                this.OnButtonSelectThird(true);
                cc.log("交换2");
            }
            if(this.CompareCardCharacter(this.headcards,this.oppocards)){
                var examplecards = [];
                for(var i = 0;i<3;i++){
                 examplecards[i]=this.headcards[i];
                }                
                this.headcards = this.oppocards;
                this.oppocards = examplecards;
                this.SetCards(this.headcards);
                this.OnButtonSelectFirst(true);
                this.SetCards(this.oppocards);
                this.OnButtonSelectSecond(true);
                cc.log("交换3");
            }





            this.selectFinish[0].node.active = true;
            this.selectFinish[1].node.active = true;
        }
    }
    private checkAlreaySetPoker():number{
        if(!this.firstCards[0].node.active&&!this.secondCards[0].node.active){
            return 0;
        }
        if(!this.thirdCards[0].node.active&&!this.secondCards[0].node.active){
            return 0;
        }
        if(!this.firstCards[0].node.active&&!this.thirdCards[0].node.active){
            return 0;
        }
        
        if (!this.firstCards[0].node.active) {
            return 1;
        }
        if (!this.secondCards[0].node.active) {
            return 2;
        }
        if (!this.thirdCards[0].node.active) {
            return 3;
        }
        return 0;
    }





    //
    //==================================================辅助方法==============
    //
    public GetCardColor(bCardData: number): number {    
        return bCardData & 0xf0;
    }
    public GetCardValue(bCardData: number): number {
        return bCardData & 0x0f;
    }
    

    public GetCardLogicValue(bCardData:number): number {
        var bCardValue = this.GetCardValue(bCardData);//获取点数 
        return bCardValue == 1 ? 14 : bCardValue;
    }
    /**
     * 牌型解析，分炼牌
     * @param bCardData 牌组
     */
    public GetCardTypeTips(bCardData:Array<number>):void{
        for(var i = 0;i<bCardData.length;i++){
            switch(this.GetCardLogicValue(bCardData[i])){
                case 0:this.fenlianpai[0]++;break;
                case 1:this.fenlianpai[1]++;break;
                case 2:this.fenlianpai[2]++;break;
                case 3:this.fenlianpai[3]++;break;
                case 4:this.fenlianpai[4]++;break;
                case 5:this.fenlianpai[5]++;break;
                case 6:this.fenlianpai[6]++;break;
                case 7:this.fenlianpai[7]++;break;
                case 8:this.fenlianpai[8]++;break;
                case 9:this.fenlianpai[9]++;break;
                case 10:this.fenlianpai[10]++;break;
                case 11:this.fenlianpai[11]++;break;
                case 12:this.fenlianpai[12]++;break;
                case 13:this.fenlianpai[13]++;break;
                case 14:this.fenlianpai[14]++;break;
            }
            cc.log("第"+i+"张牌"+this.GetCardColor(bCardData[i]));
            switch(this.GetCardColor(bCardData[i])){
                case 0:this.cardcolor[0]++;break;
                case 16:this.cardcolor[1]++;break;
                case 32:this.cardcolor[2]++;break;
                case 48:this.cardcolor[3]++;break;
            }
        }
    }

/**检查是否含有三条 */
    public CheckHaveBaoZi():number{
        var temp = -1;
        this.baozitips.splice(0,this.baozitips.length);
        for(var i = 0;i<this.fenlianpai.length;i++){
            if(this.fenlianpai[i]>=3){
                this.baozitips.push(i);
                temp = i;
            }
        }
        return temp;
    }
    /**
     * 检查是否含有同花顺
     * param 16进制牌组
     */

    public CheckHaveShunQing():boolean{
         var array = [];  
         var fangpian = [];
         var meihua = [];
         var hongtao = [];
         var heitao = [];          
        for(var i = 0;i<this.AllCard.length;i++){
            array[i] = this.AllCard[i];
        }   
        array = this.SortCardByColor(array,array.length);
     for(i = 0;i<array.length-2;i++){
         if((array[i]-array[i+1])==(array[i+1]-array[i+2])){
             if((array[i]-array[i+1])==1){
                 return true;
             }
            
         }
     }
     for(var i = 0;i<array.length;i++){
                switch(this.GetCardColor(array[i]))
                {
                    case 0:fangpian.push(array[i]);break;
                    case 16:meihua.push(array[i]);break;
                    case 32:hongtao.push(array[i]);break;
                    case 48:heitao.push(array[i]);break;
                }
                
            }
            if(fangpian.length>2){
                    fangpian = this.SortCard(fangpian,fangpian.length);
                    if((this.GetCardLogicValue(fangpian[0])==14)&&(this.GetCardLogicValue(fangpian[1])==13)&&(this.GetCardLogicValue(fangpian[2])==12)){
                        return true;
                    }               
                    if((this.GetCardLogicValue(fangpian[0])==14)&&(this.GetCardLogicValue(fangpian[fangpian.length-2])==3)&&(this.GetCardLogicValue(fangpian[fangpian.length-1])==2)){
                        return true;
                    }  
            }
            if(meihua.length>2){
                    meihua = this.SortCard(meihua,meihua.length);
                    if((this.GetCardLogicValue(meihua[0])==14)&&(this.GetCardLogicValue(meihua[1])==13)&&(this.GetCardLogicValue(meihua[2])==12)){
                        return true;
                    }
                    if((this.GetCardLogicValue(meihua[0])==14)&&(this.GetCardLogicValue(meihua[meihua.length-2])==3)&&(this.GetCardLogicValue(meihua[meihua.length-1])==2)){
                        return true;
                    }
            }
            if(hongtao.length>2){
                    hongtao = this.SortCard(hongtao,hongtao.length);
                    if((this.GetCardLogicValue(hongtao[0])==14)&&(this.GetCardLogicValue(hongtao[1])==13)&&(this.GetCardLogicValue(hongtao[2])==12)){
                        return true;
                    }
                     if((this.GetCardLogicValue(hongtao[0])==14)&&(this.GetCardLogicValue(hongtao[hongtao.length-2])==3)&&(this.GetCardLogicValue(hongtao[hongtao.length-1])==2)){
                        return true;
                    }

            }
            if(heitao.length>2){
                    heitao = this.SortCard(heitao,heitao.length);
                    if((this.GetCardLogicValue(heitao[0])==14)&&(this.GetCardLogicValue(heitao[1])==13)&&(this.GetCardLogicValue(heitao[2])==12)){
                        return true;
                    }
                     if((this.GetCardLogicValue(heitao[0])==14)&&(this.GetCardLogicValue(heitao[heitao.length-2])==3)&&(this.GetCardLogicValue(heitao[heitao.length-1])==2)){
                        return true;
                    }
            }


       
       return false;
}

    
    
    /**
     * 检查是否含有对子
     */
    public CheckHaveTwoPair():number{
        for(var i = 0;i<this.fenlianpai.length;i++){
            if(this.fenlianpai[i]>=2){
                return i;
            }
        }
        return -1;
    }
    /**
     * 是否含有顺子
     */
    public CheckHaveShunZi(){
        var temp = -1;
        for(var i =0;i<this.fenlianpai.length;i++){
            if((this.fenlianpai[i]>0)&&(this.fenlianpai[i-1]>0)&&(this.fenlianpai[i+1]>0)){                
                temp = i;
                break;
            }          
        }
         if((this.fenlianpai[2]>0)&&(this.fenlianpai[3]>0)){
                if(this.fenlianpai[14]>0){
                    temp = 1;
                }
            }
        return temp;
    }
    /**
     * 检查是否含有同花
     * 
     */
    public CheckHaveSanQing(NoSave:boolean =false):number{
        var temp = -1;
        for(var i=0;i<4;i++){
            if(this.cardcolor[i]>=3){
                temp = i;               
            }
        }
        return temp;
    }
     public  SortCardMaxK( cards:number[],  count:number):number[]
        {
            for (var i = 0; i < count - 1; i++)
            {
                for (var j = i + 1; j < count; j++)
                {
                    if (this.CompareCardMaxK(cards[j], cards[i]))
                    {
                        var temp = cards[i];
                        cards[i] = cards[j];
                        cards[j] = temp;
                    }
                }
            }
            return cards;
        }

        public  SortCard( cards:number[],  count:number):number[]
        {
            for (var i = 0; i < count - 1; i++)
            {
                for (var j = i + 1; j < count; j++)
                {
                    if (this.CompareCard(cards[j], cards[i]))
                    {
                        var temp = cards[i];
                        cards[i] = cards[j];
                        cards[j] = temp;
                    }
                }
            }
            return cards;
        }
        public  SortCardToSmall( cards:number[],  count:number):number[]
        {
            for (var i = 0; i < count - 1; i++)
            {
                for (var j = i + 1; j < count; j++)
                {
                    if (this.CompareCard(cards[j], cards[i]))
                    {
                        var temp = cards[i];
                        cards[i] = cards[j];
                        cards[j] = temp;
                    }
                }
            }
            return cards;
        }
        public SortCardByColor(cards:number[],count:number):number[]{
      
            var heitao:Array<number> = new Array<number>();
            var hongtao:Array<number> = new Array<number>();
            var meihua:Array<number> = new Array<number>();
            var fangpian:Array<number> = new Array<number>();
            for(var i = 0;i<count;i++){
                switch(this.GetCardColor(cards[i]))
                {
                    case 0:fangpian.push(cards[i]);break;
                    case 16:meihua.push(cards[i]);break;
                    case 32:hongtao.push(cards[i]);break;
                    case 48:heitao.push(cards[i]);break;
                }
                
            }
         
                if(heitao.length>0){
                    heitao = this.SortCard(heitao,heitao.length);
                    
                }
                if(hongtao.length>0){
                    hongtao = this.SortCard(hongtao,hongtao.length);
                }
                if(meihua.length>0){
                    meihua = this.SortCard(meihua,meihua.length);
                }
                if(fangpian.length>0){
                    fangpian = this.SortCard(fangpian,fangpian.length);
                }
           heitao = heitao.concat(hongtao);
           heitao = heitao.concat(meihua);
           heitao = heitao.concat(fangpian);
            return heitao;
        }
        /**
         * 排序K最大
         * @param cards 
         * @param count 
         */
       public SortCardByColorToSmall(cards:number[],count:number):number[]{
      
            var heitao:Array<number> = new Array<number>();
            var hongtao:Array<number> = new Array<number>();
            var meihua:Array<number> = new Array<number>();
            var fangpian:Array<number> = new Array<number>();
            for(var i = 0;i<count;i++){
                switch(this.GetCardColor(cards[i]))
                {
                    case 0:fangpian.push(cards[i]);break;
                    case 16:meihua.push(cards[i]);break;
                    case 32:hongtao.push(cards[i]);break;
                    case 48:heitao.push(cards[i]);break;
                }
                
            }
         
                if(heitao.length>0){
                    heitao = this.SortCardToSmall(heitao,heitao.length);                   
                }
                if(hongtao.length>0){
                    hongtao = this.SortCardToSmall(hongtao,hongtao.length);
                }
                if(meihua.length>0){
                    meihua = this.SortCardToSmall(meihua,meihua.length);
                }
                if(fangpian.length>0){
                    fangpian = this.SortCardToSmall(fangpian,fangpian.length);
                }
           heitao = heitao.concat(hongtao);
           heitao = heitao.concat(meihua);
           heitao = heitao.concat(fangpian);
            return heitao;
        }

        public  CompareCard(cardA:number, cardB:number):boolean
        {
            var logicA = this.GetCardLogicValue(cardA);
            var logicB = this.GetCardLogicValue(cardB);
            if (logicA > logicB)
                return true;
            else if (logicA < logicB)
                return false;
            else
                return this.GetCardColor(cardA) > this.GetCardColor(cardB) ? true : false;//不存在两张相同的牌
        }
        public  CompareCardMaxK(cardA:number, cardB:number):boolean
        {
            var logicA = this.GetCardValue(cardA);
            var logicB = this.GetCardValue(cardB);
            if (logicA > logicB)
                return true;
            else if (logicA < logicB)
                return false;
            else
                return this.GetCardColor(cardA) > this.GetCardColor(cardB) ? true : false;//不存在两张相同的牌
        }
        //  public  CompareCardToSamll(cardA:number, cardB:number):boolean
        // {
        //     var logicA = this.GetCardValue(cardA);
        //     var logicB = this.GetCardValue(cardB);
        //     if (logicA > logicB)
        //         return true;
        //     else if (logicA < logicB)
        //         return false;
        //     else
        //         return this.GetCardColor(cardA) > this.GetCardColor(cardB) ? true : false;//不存在两张相同的牌
        // }

    public GetCardCharacterforBiJi(cards: number[]): number {
       
        cards = this.SortCard(cards,3);
        
        var cardvalue = 0;
        var cardtype = 0;
        for (var i = 0; i < 3; i++) {
            cardvalue = cardvalue + this.GetCardLogicValue(cards[i]);

        }
        cardtype = this.GetCardColor(cards[2]);

        cardvalue = cardvalue / 3;
        if (cardvalue == this.GetCardLogicValue(cards[0]) && cardvalue == this.GetCardLogicValue(cards[1])) { return 5; }

        else if ((cardvalue * 3 == this.GetCardLogicValue(cards[1]) * 3)&& (this.GetCardLogicValue(cards[0]) - this.GetCardLogicValue(cards[1]) == 1) && (cardtype == this.GetCardColor(cards[0]) && cardtype == this.GetCardColor(cards[1]))) { return 4; }

         else if ((this.GetCardLogicValue(cards[0])==14)&&(this.GetCardLogicValue(cards[1])==3)&&(this.GetCardLogicValue(cards[2])==2) && (cardtype == this.GetCardColor(cards[0]) && cardtype == this.GetCardColor(cards[1]))) { return 4; }

        else if (cardtype == this.GetCardColor(cards[0]) && cardtype == this.GetCardColor(cards[1])) { return 3; }

        else if ((cardvalue * 3 == this.GetCardLogicValue(cards[1]) * 3)&& (this.GetCardLogicValue(cards[0]) - this.GetCardLogicValue(cards[1]) == 1)) {            
            return 2;         
         }else if((this.GetCardLogicValue(cards[0])==14)&&(this.GetCardLogicValue(cards[1])==3)&&(this.GetCardLogicValue(cards[2])==2)){
           return 2;
         }

        else if ((this.GetCardLogicValue(cards[0]) == this.GetCardLogicValue(cards[1])) || (this.GetCardLogicValue(cards[1]) == this.GetCardLogicValue(cards[2])) || (this.GetCardLogicValue(cards[0]) == this.GetCardLogicValue(cards[2]))) { return 1; }

        else return 0;
    }
    public  CompareCardCharacter(cardsA:number[], cardsB:number[]):boolean
        {
            var characterA = this.GetCardCharacterforBiJi(cardsA);
            var characterB = this.GetCardCharacterforBiJi(cardsB);
            //比较牌型
            if (characterA > characterB)
                return true;
            else if (characterA < characterB)
                return false;
            else
                switch (characterA)
                {
                    case 5: return this.CompareCard(this.GetTokenCard(cardsA), this.GetTokenCard(cardsB));//特征牌相同比较特征牌
                    case 4: return this.CompareCardShunZi(cardsA,cardsB);  
                    case 2: return this.CompareCardShunZi(cardsA,cardsB);                 
                    case 3:                   
                    case 0: return this.CompareCardPoint(cardsA, cardsB); 
                    case 1:  return this.CompareTwoPairCard(cardsA, cardsB);
                    default: return false;
                }

        }
        private CompareCardShunZi(cardsA:number[],cardsB:number[]):boolean
        {
            
            cardsA = this.SortCard(cardsA,3);
            cardsB = this.SortCard(cardsB,3);

            if((this.GetCardValue(cardsA[0])==1)&&(this.GetCardValue(cardsA[1])==3)){
                cardsA = this.SortCardMaxK(cardsA,3);
                if ((this.GetCardValue(cardsB[0]) == 1) && (this.GetCardValue(cardsB[1]) == 3))
                {
                    cardsB = this.SortCardMaxK(cardsB, 3);
                }
            }else if((this.GetCardValue(cardsB[0])==1)&&(this.GetCardValue(cardsB[1])==3)){
                cardsB = this.SortCardMaxK(cardsB,3);
            }else{
                return this.CompareCardPoint(cardsA,cardsB);
            }
            
            if(this.GetCardLogicValue(cardsA[0]) > this.GetCardLogicValue(cardsB[0]))
                return true;
            else if (this.GetCardLogicValue(cardsA[0]) < this.GetCardLogicValue(cardsB[0]))
                return false;
            else if(this.GetCardLogicValue(cardsA[1]) > this.GetCardLogicValue(cardsB[1]))
                return true;
            else if (this.GetCardLogicValue(cardsA[1]) < this.GetCardLogicValue(cardsB[1]))
                return false;
            else if (this.GetCardLogicValue(cardsA[2]) > this.GetCardLogicValue(cardsB[2]))
                return true;
            else if (this.GetCardLogicValue(cardsA[2]) < this.GetCardLogicValue(cardsB[2]))
                return false;
            else
            return this.GetCardColor(cardsA[0]) > this.GetCardColor(cardsB[0]) ? true : false;//不存在两张相同的牌
        }

       private GetTokenCard(cards:number[]):number
        {
           var temp = this.SortCard(cards,cards.length);
            return temp[0];
        }
     private  CompareCardPoint(cardsA:number[], cardsB:number[]):boolean
        {
            

            cardsA = this.SortCard(cardsA,3);
            cardsB = this.SortCard(cardsB,3);
            if(this.GetCardLogicValue(cardsA[0]) > this.GetCardLogicValue(cardsB[0]))
                return true;
            else if (this.GetCardLogicValue(cardsA[0]) < this.GetCardLogicValue(cardsB[0]))
                return false;
            else if(this.GetCardLogicValue(cardsA[1]) > this.GetCardLogicValue(cardsB[1]))
                return true;
            else if (this.GetCardLogicValue(cardsA[1]) < this.GetCardLogicValue(cardsB[1]))
                return false;
            else if (this.GetCardLogicValue(cardsA[2]) > this.GetCardLogicValue(cardsB[2]))
                return true;
            else if (this.GetCardLogicValue(cardsA[2]) < this.GetCardLogicValue(cardsB[2]))
                return false;
            else
            return this.GetCardColor(cardsA[0]) > this.GetCardColor(cardsB[0]) ? true : false;//不存在两张相同的牌
        }
      public  CompareTwoPairCard(cardsA:number[], cardsB:number[]):boolean
        {
            var twopairA = 0;
            var maxcardA = 0;
            var twopairB = 0;
            var maxcardB = 0;
            var tempA = [];
            var tempB = [];
            tempA[0] = this.GetCardLogicValue(cardsA[0]);
            tempA[1] = this.GetCardLogicValue(cardsA[1]);
            tempA[2] = this.GetCardLogicValue(cardsA[2]);
            tempB[0] = this.GetCardLogicValue(cardsB[0]);
            tempB[1] = this.GetCardLogicValue(cardsB[1]);
            tempB[2] = this.GetCardLogicValue(cardsB[2]);
            if (tempA[1] == tempA[2])
            {
                twopairA = tempA[1];
                maxcardA = cardsA[0];
            }else
            if (tempA[0] == tempA[2])
            {
                twopairA = tempA[0];
                maxcardA = cardsA[1];
            }else
            if (tempA[0] == tempA[1])
            {
                twopairA = tempA[0];
                maxcardA = cardsA[2];
            }

            if (tempB[1] == tempB[2])
            {
                twopairB = tempB[1];
                maxcardB = cardsB[0];
            }
            else
           if (tempB[0] == tempB[2])
            {
                twopairB = tempB[0];
                maxcardB = cardsB[1];
            }
            else
           if (tempB[0] == tempB[1])
            {
                twopairB = tempB[0];
                maxcardB = cardsB[2];
            }

            if (twopairA > twopairB)
            {
                return true;
            }else if (twopairA < twopairB)
            {
                return false;
            }
            else if(maxcardA>maxcardB){
                return true;
            }else if(maxcardA<maxcardB){
                return false
            }else{
                cc.log("对子类型全等");
                return true
            }
            
       
        }

}