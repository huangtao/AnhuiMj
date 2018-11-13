// {
//     "emailAry": [
//         {
//             "emailID": 3245,
//             "sendTime": 1499458533,
//             "emailTitle": "系统消息",
//             "emailContext": "绑定代理赠送,赠送",
//             "NickName": "游客294247",
//             "SendPlayerID": 9999,
//             "Attachment": [
//                 {
//                     "AttachmentType": 2,
//                     "AttachmentNum": 6,
//                     "MessageID": 3245
//                 }
//             ]
//         }
//     ],
//     "status": "success",
//     "msg": "OK"
// }

import { QL_Common } from "../../CommonSrc/QL_Common";

export class Attachment {
    AttachmentType: QL_Common.CurrencyType;
    AttachmentNum: number;
    MessageID: number;
}

export class EmailInfo {
    /**
     * 邮件ID
     */
    emailID: number;
    /**
     * 邮件发送时间
     */
    sendTime: number;
    /**
     * 标题
     */
    emailTitle: string;
    /**
     * 文本内容
     */
    emailContext: string;
    /**
     * 发件人
     */
    NickName: string;

    /**
     * 发送者ID
     */
    SendPlayerID: number;

    /**
     * 附件列表
     */
    Attachment: Array<Attachment>;

    /**
     * 邮件状态0 未读 1已读 2已删除
     */
    status:number;
}

export class EmailIMessage {
    emailAry: Array<EmailInfo>;
    status: number;
    msg: string;
}