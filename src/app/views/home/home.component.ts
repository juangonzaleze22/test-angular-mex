import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageCarousel = [
    {
      id: 0,
      src: 'assets/images/carousel/img-carousel-1.jpg'
    },
    {
      id: 1,
      src: 'assets/images/carousel/img-carousel-2.jpg'
    },
    {
      id: 2,
      src: 'assets/images/carousel/img-carousel-3.jpg'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
