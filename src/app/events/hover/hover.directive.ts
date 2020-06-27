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
  defaultcolor: string = 'white';
  Highlightedcolor: string = 'red';
  @ViewChild('zipEl') zipEl: ElementRef;
  ngAfterViewInit() {
    @HostListener('mouseover', ['$event']) {
      console.log('yoyo')
    }
    }
  @HostBinding('style.color') color: string = this.defaultcolor;

  constructor(private el: ElementRef, private renderer: Renderer2) {}


  // @HostListener('mouseover', ['$event'])
  // changeHeader(): void {
  //   this.renderer.addClass(event.target, 'hovered');
  //   if (this.el.nativeElement.querySelector('tr .hovered')) {
  //     console.log(event.target);
  //     this.renderer.setAttribute(this.zipEl.nativeElement, 'value', 'red');
  //   }
  // }
  // @HostListener('mouseleave', ['$event'])
  // changeHeaderDefault(): void {
  //   this.renderer.removeClass(event.target, 'hovered');
  //   // this.renderer.setProperty(this.el.nativeElement.querySelector('.headerOutput'), 'value', '#343a40')
  // }
}

//   @HostListener('mouseleave') mouseleave(event: Event) {
//     this.color = this.defaultcolor;
//   }
