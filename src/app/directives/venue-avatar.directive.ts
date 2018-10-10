import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {environment} from "../../environments/environment";

@Directive({
  selector: '[venueAvatar]'
})
export class VenueAvatarDirective implements OnInit{

  @HostListener('error') onError(){
    this.src = 'src/assets/baseline-location_city-24px.svg'
  }
  @Input('venueAvatar') venueId: string
  env = environment
  @HostBinding('src') src

  constructor(private el : ElementRef, private renderer: Renderer2) {

  }
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'vertical-align', 'middle')
    this.renderer.setStyle(this.el.nativeElement, 'width', '50px')
    this.renderer.setStyle(this.el.nativeElement, 'height', '50px')
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '50%')
    this.src  = this.env.venues.avatar(this.venueId)
  }

}
