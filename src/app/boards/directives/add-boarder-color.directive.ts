import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAddBoarderColor]',
})
export class AddBoarderColorDirective implements AfterViewInit {
  @Input() borderColor!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'border-color',
      this.borderColor,
    );
  }
}
