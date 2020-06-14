import { Directive, ElementRef  } from '@angular/core';

@Directive({
  selector: '[ktMenuDirective]'
})
export class USSDMenuDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
 }

}
