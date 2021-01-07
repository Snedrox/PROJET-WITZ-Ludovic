import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appCheckPassword]'
})
export class CheckPasswordDirective {

  @Input() appError = true;

  constructor() { }

  ngOnChanges() {
    if (!this.appError) {
      alert('test');
    }
  }

}
