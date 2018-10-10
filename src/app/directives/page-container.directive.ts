import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[pageContainer]'
})
export class PageContainerDirective implements OnInit{

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, "min-height", "90vh")
    this.renderer.addClass(this.elementRef.nativeElement, "mt-4")
  }

}
