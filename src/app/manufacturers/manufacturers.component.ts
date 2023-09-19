import { Component, OnInit } from '@angular/core';
import { Manufacturers } from 'models/manufacturers';
import { ManufacturersService } from 'services/manufacturers.service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss'],
})
export class ManufacturersComponent implements OnInit {
  manufacturersArr: Manufacturers[] = [];
  constructor(private manufacturersService: ManufacturersService) {
    this.manufacturersService.getmanufacturer().subscribe((data) => {
      this.manufacturersArr = data;
    });
  }

  ngOnInit(): void {}
  /* displaymanufacturerDetails(pid: number) {
    //console.log('Manufacturer id of item is: ' + pid);
    this.router.navigate(['/singleproduct/' + pid]);
  } */
}
