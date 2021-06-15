import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() images: Array<any>;

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    nav: false,
    items: 1
  }

  constructor() { }

  ngOnInit(): void {
  }

}
