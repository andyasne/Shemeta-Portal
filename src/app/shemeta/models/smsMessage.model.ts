import { SMSTemplateModel } from './smsTemplate';

export class SMSMessageModel {
    public _id: string;
    public smsTemplate:SMSTemplateModel;
    public builtMessage:string;
    public status:string;
    public sentTime:string;
    public sentTo:string;
    public from:string;
}

