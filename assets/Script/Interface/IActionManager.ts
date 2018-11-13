import { Action } from "../CustomType/Action";



export interface IActionManager{
    AddKeyFunction(key: string, call: Action,tager?:any): boolean ;
    AddFunction(call: Action): string ;
    RunCallback(key: string, value: any) ;
}