import { Directive } from '@angular/core';
import { ElementRef, inject } from '@angular/core';
@Directive({
  selector: '[appHighLight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class AppHighLight {
  private el = inject(ElementRef);
  constructor() {}

  onMouseEnter() {
    console.log('enter');
    this.highlight('yellow');
  }
  onMouseLeave() {
    console.log('leave');
    this.highlight('pink');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
