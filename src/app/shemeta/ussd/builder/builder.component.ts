import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

   cols=[1,2,1,2 ];;
   rows=[1,2,3,3,4];

  constructor() { }


  ngOnInit(): void {
  }

}
