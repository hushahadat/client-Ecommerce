import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
