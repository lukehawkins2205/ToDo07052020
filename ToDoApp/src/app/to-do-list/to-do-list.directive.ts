import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[ToDoTicked]'
})
export class DropdownDirective {
  @HostBinding('class.checked') isChecked = false;

  @HostListener('click') toggleOpen() {
    this.isChecked! = this.isChecked;
    console.log('ticked!');
  }
}
