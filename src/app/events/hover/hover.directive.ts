import {
  Directive,
  HostBinding,
  ElementRef,
  Renderer2,
  HostListener,
  ViewChild,
  Input,
} from '@angular/core';


@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  header: string;
  target: string;
  defaultcolor: string = 'white';
  Highlightedcolor: string = 'red';
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @ViewChild('zipEl') zipEl: ElementRef;
  ngAfterViewInit() {
    this.header = this.el.nativeElement.querySelector('.headerOutput')
    }
  @HostBinding('style.color') color: string = this.defaultcolor;

  


  @HostListener('mouseover', ['$event'])
  changeHeader(): void {
    this.renderer.addClass(event.target, 'hovered');
    this.target = this.el.nativeElement.querySelector('tr .hovered').value
    if (this.target) {
      console.log(event.target);
      this.renderer.setProperty(this.header, 'innerHTML', this.target);
    }
  }
  @HostListener('mouseleave', ['$event'])
  changeHeaderDefault(): void {
    this.renderer.removeClass(event.target, 'hovered');
    // this.renderer.setProperty(this.el.nativeElement.querySelector('.headerOutput'), 'value', '#343a40')
  }
}

//   @HostListener('mouseleave') mouseleave(event: Event) {
//     this.color = this.defaultcolor;
//   }
