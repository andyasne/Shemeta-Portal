import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shemeta-menu',
  template: `
  <div class="card m-2 p-2"  >
<div class="  card-block"      *ngFor="let joke of jokes.menuElements">
   <h5 class="card-title">{{joke.displayTexts.english}}</h5>
  <!-- <p class="card-text">{{joke.displayTexts.english}}</p> -->
</div></div>
  `
})
export class MenuComponent implements OnInit {
 jokes : any;
    //  jokes: Object[ ];

  constructor() {
    this.jokes =
      {
        _id: "2",
        menuElements: [
            {
                menuItem: {
                    loadUserData: false,
                    exit: false,
                    readOnly: false,
                    _id: "5eda95dbb1f565221882617c",
                    displayText: "5eda75ae65ef234e689cd48a",
                    selector: "4",
                    order: 4,
                    menuType: "label",
                    questionDataType: "string",
                    parentMenuItemId: "5eda953ab1f5652218826178",
                    __v: 0,
                    code: "4",
                    parentCode: "2"
                }
              ,
                displayTexts: {
                    isStatic: true,
                    _id: "5eda75ae65ef234e689cd48a",
                    english: "lbl English 8",
                    amharic: "lbl amharic 8",
                    afanOromo: "lbl afanOromo 8",
                    tigrigna: "lbl tigrigna 8",

                }
            },
            {
              menuItem: {
                  loadUserData: false,
                  exit: false,
                  readOnly: false,
                  _id: "5eda95dbb1f565221882617c",
                  displayText: "5eda75ae65ef234e689cd48a",
                  selector: "4",
                  order: 4,
                  menuType: "label",
                  questionDataType: "string",
                  parentMenuItemId: "5eda953ab1f5652218826178",
                  __v: 0,
                  code: "4",
                  parentCode: "2"
              }
            ,
              displayTexts: {
                  isStatic: true,
                  _id: "5eda75ae65ef234e689cd48a",
                  english: "lbl English 3",
                  amharic: "lbl amharic 8",
                  afanOromo: "lbl afanOromo 8",
                  tigrigna: "lbl tigrigna 8",

              }
          }
        ]
    }



  }

  ngOnInit(): void {
  }
//  let jokes: Object[];

}
