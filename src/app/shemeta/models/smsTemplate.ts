export class SMSTemplateModel {
    public _id: string;
    public additionalAttributes: string;
    public smsLabel:SMSLabelModel;
}

export class SMSLabelModel {
    public am: string;
    public en: string;
    public oro: string;
    public tig: string;

}