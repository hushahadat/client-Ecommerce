import { Component, OnInit } from '@angular/core';
import { Manufacturers } from 'models/manufacturers';
import { ManufacturersService } from 'services/manufacturers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-manufacturer',
  templateUrl: './view-manufacturer.component.html',
  styleUrls: ['./view-manufacturer.component.scss'],
})
export class ViewManufacturerComponent implements OnInit {
  manufacturersArr: Manufacturers[] = [];
  constructor(private manufacturersService: ManufacturersService) {
    this.manufacturersService.getmanufacturer().subscribe((data) => {
      this.manufacturersArr = data;
    });
  }

  ngOnInit(): void {}

  deletemanufacture(pid: any) {
    this.manufacturersService.deletemanufacture(pid).subscribe((data) => {
      console.log(data);
    });
    location.reload();
  }
}
