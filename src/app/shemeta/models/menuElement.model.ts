import { _displayTexts } from './_displayTexts';
import { _menuItem } from './_menuItem';

export class MenuElementModel {
   public menuItem: _menuItem;
   public displayTexts: _displayTexts;
    constructor()
    {
        this.menuItem = new _menuItem();
        this.displayTexts= new _displayTexts();
    }
}

