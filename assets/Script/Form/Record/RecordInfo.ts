export class UserData{
    NickName:string;
    MoneyNum:number;

}

export class TotalUserData extends UserData{
    UserID:number;
    Header:string;
}

export class RecordInfo {
    ID :number;
    CTime:number;
    UserData:UserData[];
    RcordCost:number;
}

export class D{
    gameGroupName:string;
    Owner:number;
    RecordInfo:RecordInfo[];
    TopId:number;
    GameId:number;
    TotalUserData:TotalUserData[];
}

export class RecordInfoMessage {
    d:D[];
    status:string;
    msg:string;
}