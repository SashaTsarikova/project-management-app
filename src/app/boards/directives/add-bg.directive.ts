import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAddBg]',
})
export class AddBgDirective implements AfterViewInit {
  @Input() bgColor!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.bgColor
    );
  }
}
