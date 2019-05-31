import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDownToggle]'
})
export class DropDownToggleDirective {

  constructor() { }

  @HostBinding ('class.open') isOpen = false;

  @HostListener('click') toggleOnClick(){
    this.isOpen = !this.isOpen;
  }

}
