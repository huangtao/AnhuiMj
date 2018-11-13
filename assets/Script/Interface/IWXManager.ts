import { ShareParam } from "../CustomType/ShareParam";

export interface IWXManager {
    Login(): void;
    ShareAndSelectType(param: ShareParam): void;
    Share(param: ShareParam): void;
    ShareInviteImg(param:ShareParam):void;
    ShareLinkImg(param: ShareParam):void;
    CaptureScreenshot(node?: cc.Node,wXScene?:number,haveMask?: boolean,filename?: string): void;
}