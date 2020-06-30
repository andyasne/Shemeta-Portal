export class MenuElementModel {
    menuItem: _menuItem;
    displayTexts: _displayTexts;
}
export class _menuItem {
    loadUserData: boolean;
    readOnly: boolean;
    exit: boolean;
    _id: string;
    displayText: string;
    selector: string;
    order: number;
    menuType: string;
    questionDataType: string;
    code: number;
    parentCode: number;

}


export class _displayTexts {
    isStatic: boolean;
    _id: string;
    english: string;
    amharic: string;
    afanOromo: string;
    tigrigna: string;
}
