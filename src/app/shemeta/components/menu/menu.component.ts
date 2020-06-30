import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalComponent, NgbdModalContentComponent } from '../../../views/pages/ngbootstrap/modal/modal.component';




// const modalWithDefaultOptions = {
// 	beforeCodeTitle: 'Modal with default options',
// 	htmlCode: `
// <div class="example-preview">
//   <span *ngIf="closeResult">
//     <pre>{{closeResult}}</pre>
//   </span>
//   <div>
//     <ng-template #content let-c="close" let-d="dismiss">
//       <div class="modal-header">
//         <h4 class="modal-title">Basic demo</h4>
//         <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
// 		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
// 		  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
// 		  type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
// 		  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
//           passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" (click)="c('Close click')">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </ng-template>
//     <button class="btn btn-primary" (click)="open(content)">Launch demo modal</button>
//   </div>
// </div>
// `,
// 	tsCode: `
// import {Component} from '@angular/core';\n
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';\n
// @Component({
//     selector: 'ngbd-modal-basic',
//     templateUrl: './modal-basic.html'
// })
// export class NgbdModalBasic {
//     closeResult: string;\n
//     constructor(private modalService: NgbModal) {}\n
//     open(content) {
//         this.modalService.open(content).result.then((result) => {
//         this.closeResult = \`Closed with: $\{result\}\`;
//         }, (reason) => {
//             this.closeResult = \`Dismissed $\{this.getDismissReason(reason)\}\`;
//         });
//     }\n
//     private getDismissReason(reason: any): string {
//         if (reason === ModalDismissReasons.ESC) {
//             return 'by pressing ESC';
//         } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//             return 'by clicking on a backdrop';
//         } else {
//             return  \`with: $\{reason}\`;
//         }
//     }
// }
// `,
// 	isCodeVisible: false,
// 	isExampleExpanded: true
// };




// @Component({
//   selector: 'shemeta-menu',
//   template: `

//   <div class="card m-1 p-1"  >
//    <h5 style="text-align: center;">2</h5>
// <div class="  card-block"      *ngFor="let joke of jokes.menuElements">
//    <p class="card-text p-1">{{joke.displayTexts.english}}<button class="btn btn-info" (click)="open()">Add Sub Menu</button></p>
// </div>
// <button class="btn btn-info" (click)="open()">Add Menu Item</button>

// </div >
//   `
// })
export class MenuComponent implements OnInit {
  exampleModalWithDefaultOptions

	closeResult: string;
	closeResult2: string;
 jokes : any;
    exampleComponentsAsContent;
  constructor(private modalService: NgbModal) {
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
                    english: "1. Check Account Balance",
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
                  selector: "5",
                  order: 5,
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
                  english: "2. Show Transactions",
                  amharic: "lbl amharic 8",
                  afanOromo: "lbl afanOromo 8",
                  tigrigna: "lbl tigrigna 8",

              }
          }
        ]
    }



  }


	open(content) {
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }
  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


	open2() {
		const modalRef = this.modalService.open(NgbdModalContentComponent);
		modalRef.componentInstance.name = 'World';
	}

  ngOnInit(): void {
   		// this.exampleModalWithDefaultOptions = modalWithDefaultOptions;

  }
//  let jokes: Object[];

}
